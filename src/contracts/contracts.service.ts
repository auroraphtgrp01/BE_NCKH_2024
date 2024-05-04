import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common'
import { CreateContractDto, CreateEmptyContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { contractStatus } from '@prisma/client'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { UpdateContractAttributeDto, UpdateContractDto } from './dto/update-contract.dto'

import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact } from '@prisma/client/runtime/library'
import { IContractResponse, ICreateContractResponse } from 'src/interfaces/contract.interface'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { ParticipantsService } from 'src/participants/participants.service'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { IContractAttributeResponse } from 'src/interfaces/contract-attribute.interface'
import { ethers } from 'ethers'
@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => ParticipantsService)) private readonly participantService: ParticipantsService,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    private readonly templateContractsService: TemplateContractsService,
    private readonly usersService: UsersService,
    private readonly contractAttributesService: ContractAttributesService,
    private readonly contractAttributeValuesService: ContractAttributeValuesService
  ) {}

  test(jsonData: any) {
    const jsonStr = JSON.stringify(jsonData)

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
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const contractResponse: ICreateContractResponse = { contract: null, contractAttributes: [] }
    const { invitation, templateId, ...contractData } = createContractDto
    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    const contractRecord = await this.createEmptyContract({ ...contractData }, user)
    await this.participantService.sendInvitation(
      { invitation, contractName: contractRecord.contractTitle, contractId: contractRecord.id },
      user
    )
    contractResponse.contract = contractRecord

    if (templateId) {
      if (!(await this.templateContractsService.findOneById(templateId)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })

      contractResponse.contractAttributes = await this.createContractAttributesByTemplateId(
        contractRecord.id,
        templateId,
        user
      )
    }
    return contractResponse
  }

  async getContractsByAddressWallet(addressWallet: string) {
    const contracts = await this.prismaService.client.contract.findMany({ where: { addressWallet } })

    const contractAttributes = []
    await Promise.all(
      contracts.map(async (contract) => {
        contractAttributes.push(await this.contractAttributesService.findAllByContractId(contract.id))
      })
    )

    return { contracts, contractAttributes }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async findOneById(id: string) {
    const contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    return contract
  }

  async getContractDetailsById(contractId: string) {
    const contract = await this.findOneById(contractId)
    if (!contract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    const participants = await this.participantService.findAllByContractId(contractId)
    return { contract, contractAttributes, participants }
  }

  async update(updateContractDto: UpdateContractDto, user: IUser) {
    return 'update'
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
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
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
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE ||
            item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
          ) {
            console.log('item', item)

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
    user: IUser
  ): Promise<IContractAttributeResponse[]> {
    const contractAttributes = await this.prismaService.client.contractAttribute
      .findMany({
        where: {
          templateContractId
        }
      })
      .then((contractAttributes) => {
        const newContractAttributes: any[] = []
        contractAttributes.forEach((contractAttribute) => {
          if (
            contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
            contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
            contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE ||
            contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
          )
            newContractAttributes.push({
              property: contractAttribute.value,
              value: 'Empty',
              type: contractAttribute.type
            })
          else
            newContractAttributes.push({
              value: contractAttribute.value,
              type: contractAttribute.type
            })
        })
        return newContractAttributes
      })

    const [contractAttributeRecords] = await Promise.all([
      this.commonService.createContractAttributes({ contractAttributes, contractId: contractId }, user)
    ])

    return contractAttributeRecords
  }

  async removeContractAttributesByContractId(contractId: string) {
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    const contractTypeTitles = contractAttributes.filter(
      (item) =>
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE &&
        item.type !== ETypeContractAttribute.CONTRACT_SIGNATURE &&
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE &&
        item.type !== ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
    )
    const contractTypeAttributes = contractAttributes.filter(
      (item) =>
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE ||
        item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
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

  async createContractAttributes(contractId: string, templateContractId: string, user: IUser) {
    if (!(await this.findOneById(contractId)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    if (!(await this.templateContractsService.findOneById(templateContractId)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })

    if ((await this.contractAttributesService.findAllByContractId(contractId)).length === 0) {
      return await this.createContractAttributesByTemplateId(contractId, templateContractId, user)
    }
    await this.removeContractAttributesByContractId(contractId)
    return await this.createContractAttributesByTemplateId(contractId, templateContractId, user)
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }
}
