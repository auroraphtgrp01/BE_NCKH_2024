import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractDto, CreateEmptyContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { Contract, ContractAttribute, Participant, Suppliers, User, contractStatus } from '@prisma/client'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { UpdateContractAttributeDto, UpdateContractDto } from './dto/update-contract.dto'

import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact } from '@prisma/client/runtime/library'
import { ICreateContractResponse, IStage } from 'src/interfaces/contract.interface'
import { EContractType, ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { ParticipantsService } from 'src/participants/participants.service'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { IContractAttributeResponse } from 'src/interfaces/contract-attribute.interface'
import { ethers } from 'ethers'
import { SuppliersService } from 'src/suppliers/suppliers.service'
@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => ParticipantsService)) private readonly participantService: ParticipantsService,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    private readonly templateContractsService: TemplateContractsService,
    private readonly usersService: UsersService,
    private readonly contractAttributesService: ContractAttributesService,
    private readonly contractAttributeValuesService: ContractAttributeValuesService,
    private readonly suppliersService: SuppliersService
  ) {}

  test(jsonData: any) {
    const jsonStr = '"' + 'test": ' + JSON.stringify(jsonData)
    return jsonStr

    const bytesData = ethers.toUtf8Bytes(jsonStr)
    const bytesDataHex = ethers.hexlify(bytesData)

    const jsonString = ethers.toUtf8String(bytesData)
    const jsonArray = JSON.parse(jsonString)

    return {
      bytesDataHex,
      jsonArray,
      jsonData,
      type1: typeof jsonData,
      type2: typeof jsonArray,
      check: jsonData === jsonArray
    }
  }

  async createEmptyContract(contractData: CreateEmptyContractDto, user: IUser) {
    const { addressWallet, name, id } = contractData
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const contract = await this.prismaService.client.contract.create({
      data: {
        id,
        addressWallet,
        contractTitle: name,
        status: contractStatus.PENDING as Exact<contractStatus, contractStatus>,
        type: contractData.type ? contractData.type : EContractType.CONTRACT,
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const contractResponse: ICreateContractResponse = { contract: null, contractAttributes: [] }
    const { invitation, templateId, userId, supplierId, ...contractData } = createContractDto
    const _user = await this.usersService.findOneById(userId)
    const supplier = await this.suppliersService.findOneById(supplierId)
    if (!_user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    if (!supplier) throw new NotFoundException({ message: RESPONSE_MESSAGES.SUPPLIER_NOT_FOUND })

    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })

    const contractRecord = await this.createEmptyContract({ ...contractData }, user)
    await this.participantService.sendInvitation(
      { invitation, contractName: contractRecord.contractTitle, contractId: contractRecord.id },
      user
    )
    contractResponse.contract = contractRecord
    if (templateId)
      if (!(await this.templateContractsService.findOneById(templateId)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
    contractResponse.contractAttributes = await this.createContractAttributesByTemplateId(
      contractRecord.id,
      templateId ? templateId : (await this.templateContractsService.findFirst()).id,
      _user,
      supplier,
      user
    )

    return contractResponse
  }

  async getContractsByAddressWallet(addressWallet: string) {
    const contracts = await this.prismaService.client.contract.findMany({ where: { addressWallet } })

    return { contracts }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async findOneById(id: string) {
    const contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    return contract
  }

  async getContractDetailsById(
    contractId: string
  ): Promise<{ contract: Contract; contractAttributes: IContractAttributeResponse[]; participants: Participant[] }> {
    const contract = await this.findOneById(contractId)
    if (!contract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    const participants = await this.participantService.findAllByContractId(contractId)

    return { contract, contractAttributes, participants }
  }

  async update(updateContractDto: UpdateContractDto, user: IUser) {
    if (!(await this.findOneById(updateContractDto.id)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const contract = await this.prismaService.client.contract.update({
      where: { id: updateContractDto.id },
      data: { ...(updateContractDto as any), updatedBy }
    })

    return contract
  }

  async updateContractAttribute(updateContractAttribute: UpdateContractAttributeDto, user: IUser) {
    const isContractExist = await this.prismaService.client.contract.findUnique({
      where: { id: updateContractAttribute.id }
    })
    if (!isContractExist) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

    Promise.all([
      updateContractAttribute.updatedAttributes.map(async (item, index) => {
        if (item.statusAttribute === 'Create') {
          if (
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
            item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
            item.type === ETypeContractAttribute.TOTAL_AMOUNT
          ) {
            const contractAttribute = await this.contractAttributesService.create(
              {
                contractId: updateContractAttribute.id,
                value: item.property,
                type: item.type,
                index: item.index
              },
              user
            )
            await this.contractAttributeValuesService.create(
              {
                value: item.value,
                contractAttributeId: contractAttribute.id
              },
              user
            )
          } else {
            const contractAttribute = await this.contractAttributesService.create(
              {
                contractId: updateContractAttribute.id,
                value: item.value,
                type: item.type,
                index: item.index
              },
              user
            )
            await this.contractAttributeValuesService.create(
              {
                value: item.value,
                contractAttributeId: contractAttribute.id
              },
              user
            )
          }
        }
        if (item.statusAttribute === 'Update') {
          if (
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
            item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
            item.type === ETypeContractAttribute.TOTAL_AMOUNT
          ) {
            const contractAttribute = await this.contractAttributesService.update(
              {
                id: item.id,
                value: item.property,
                type: item.type,
                index: item.index
              },
              user
            )
            await this.contractAttributeValuesService.update(
              {
                value: item.value,
                contractAttributeId: contractAttribute.id
              },
              user
            )
          } else {
            const contractAttribute = await this.contractAttributesService.update(
              {
                id: item.id,
                value: item.value,
                type: item.type,
                index: item.index
              },
              user
            )
            await this.contractAttributeValuesService.update(
              {
                value: item.value,
                contractAttributeId: contractAttribute.id
              },
              user
            )
          }
        }
      }),
      Promise.all([
        updateContractAttribute.deleteArray.map(async (item) => {
          await this.prismaService.client.contractAttributeValue.delete({ where: { contractAttributeId: item } })
          await this.prismaService.client.contractAttribute.delete({ where: { id: item } })
        })
      ])
    ])
    return {
      message: RESPONSE_MESSAGES.UPDATE_CONTRACT_ATTRIBUTE_SUCCESS
    }
  }

  async createContractAttributesByTemplateId(
    contractId: string,
    templateContractId: string,
    _user: User,
    supplier: Suppliers & { User: User },
    user: IUser
  ): Promise<IContractAttributeResponse[]> {
    const template = await this.templateContractsService.findOneById(templateContractId)
    if (!template) throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
    const getAllContractAttributes: ContractAttribute[] = await Promise.all(
      template.contractAttributes.map(async (item) => {
        const contractAttribute = await this.prismaService.client.contractAttribute.findUnique({
          where: { id: item }
        })
        return contractAttribute
      })
    )

    const contractAttributes: any[] = []
    const isInfoParty = { index: -1, role: '' }
    getAllContractAttributes.forEach((contractAttribute, index) => {
      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        if (isInfoParty.index !== -1) {
          switch (index) {
            case isInfoParty.index + 1:
              contractAttributes.push({
                property: contractAttribute.value,
                value: isInfoParty.role === 'Customer' ? 'Empty' : supplier.name,
                type: contractAttribute.type
              })
              break
            case isInfoParty.index + 2:
              contractAttributes.push({
                property: contractAttribute.value,
                value: isInfoParty.role === 'Customer' ? _user.name : supplier.User.name,
                type: contractAttribute.type
              })
              break
            case isInfoParty.index + 3:
              contractAttributes.push({
                property: contractAttribute.value,
                value: isInfoParty.role === 'Customer' ? (_user.address ? _user.address : 'Empty') : supplier.address,
                type: contractAttribute.type
              })
              break
            default:
              contractAttributes.push({
                property: contractAttribute.value,
                value: isInfoParty.role === 'Customer' ? _user.phoneNumber : supplier.User.phoneNumber,
                type: contractAttribute.type
              })
              isInfoParty.index = -1
              isInfoParty.role = ''
              break
          }
        } else {
          if (contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND)
            contractAttributes.push({
              property: contractAttribute.value,
              value: _user.addressWallet,
              type: contractAttribute.type
            })
          else if (contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE)
            contractAttributes.push({
              property: contractAttribute.value,
              value: supplier.User.addressWallet,
              type: contractAttribute.type
            })
          else
            contractAttributes.push({
              property: contractAttribute.value,
              value: 'Empty',
              type: contractAttribute.type
            })
        }
      } else {
        if (contractAttribute.value === 'Bên A') {
          isInfoParty.index = index
          isInfoParty.role = 'Customer'
        } else if (contractAttribute.value === 'Bên B') {
          isInfoParty.index = index
          isInfoParty.role = 'Supplier'
        }
        contractAttributes.push({
          value: contractAttribute.value,
          type: contractAttribute.type
        })
      }
    })

    const [contractAttributeRecords] = await Promise.all([
      this.contractAttributesService.createContractAttributes({ contractAttributes, contractId: contractId }, user)
    ])

    return contractAttributeRecords
  }

  async removeContractAttributesByContractId(contractId: string) {
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    const contractTypeTitles = contractAttributes.filter(
      (item) =>
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE &&
        item.type !== ETypeContractAttribute.CONTRACT_SIGNATURE &&
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED &&
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE &&
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND &&
        item.type !== ETypeContractAttribute.TOTAL_AMOUNT
    )
    const contractTypeAttributes = contractAttributes.filter(
      (item) =>
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        item.type === ETypeContractAttribute.TOTAL_AMOUNT
    )

    await Promise.all([
      contractTypeTitles.map(async (item) => {
        await this.prismaService.client.contractAttribute.deleteMany({ where: { id: item.id } })
      }),
      contractTypeAttributes.map(async (item) => {
        await this.prismaService.client.contractAttributeValue.deleteMany({ where: { contractAttributeId: item.id } })
        await this.prismaService.client.contractAttribute.deleteMany({ where: { id: item.id } })
      })
    ])
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }
}
