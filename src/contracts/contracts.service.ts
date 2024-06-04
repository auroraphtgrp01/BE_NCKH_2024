import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractDto, CreateDisputeContractDto, CreateEmptyContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import {
  Contract,
  ContractAttribute,
  Participant,
  ParticipantStatus,
  Suppliers,
  User,
  contractStatus
} from '@prisma/client'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { UpdateContractAttributeDto, UpdateContractDto } from './dto/update-contract.dto'

import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact } from '@prisma/client/runtime/library'
import { ICreateContractResponse, IStage, IVoting } from 'src/interfaces/contract.interface'
import {
  EContractType,
  ERoleParticipant,
  ERoles,
  EStageStatus,
  ETypeContractAttribute,
  EVoting
} from 'src/constants/enum.constant'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { ParticipantsService } from 'src/participants/participants.service'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { IContractAttributeResponse } from 'src/interfaces/contract-attribute.interface'
import { ethers } from 'ethers'
import { SuppliersService } from 'src/suppliers/suppliers.service'
import { ICreateInvitation } from 'src/interfaces/participant.interface'
import { CommonService } from 'src/commons/common.service'
@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly templateContractsService: TemplateContractsService,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ContractAttributesService))
    private readonly contractAttributesService: ContractAttributesService,
    private readonly contractAttributeValuesService: ContractAttributeValuesService,
    private readonly suppliersService: SuppliersService,
    private readonly participantsService: ParticipantsService,
    private readonly commonService: CommonService
  ) {}
  async createEmptyContract(contractData: CreateEmptyContractDto, user: IUser) {
    const { addressWallet, name, type } = contractData
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    const contract = await this.prismaService.client.contract.create({
      data: {
        addressWallet,
        contractTitle: name,
        status: contractStatus.PENDING as Exact<contractStatus, contractStatus>,
        type: type ? type : EContractType.CONTRACT,
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }

  async createDisptuteContract(createDisputeContractDto: CreateDisputeContractDto, user: IUser) {
    const { totalAmount, customer, supplier, ...rest } = createDisputeContractDto
    const economicArbitrations = await this.prismaService.client.user.findMany({
      where: { role: ERoles.ARBITRATION }
    })
    const invitation: ICreateInvitation[] = []
    const votings: IVoting[] = []

    const contract = await this.createEmptyContract(
      { ...rest, name: 'HỢP ĐỒNG TRANH CHẤP', type: EContractType.DISPUTE },
      user
    )

    await Promise.all(
      economicArbitrations.map((economicArbitration) => {
        invitation.push({
          email: economicArbitration.email,
          messages: 'An invitation to become an economic arbitrator of a disputed contract',
          permission: {
            CHANGE_STATUS_CONTRACT: false,
            EDIT_CONTRACT: false,
            INVITE_PARTICIPANT: true,
            READ_CONTRACT: true,
            SET_OWNER_PARTY: false,
            ROLES: ERoleParticipant.ARBITRATION
          }
        })
        votings.push({
          userId: economicArbitration.id,
          contractId: contract.id,
          vote: EVoting.PENDING
        })
      })
    )

    const result = await this.update({ id: contract.id, votings }, user)

    await this.participantsService.sendInvitation(
      { invitation, contractName: contract.contractTitle, contractId: contract.id },
      user
    )

    return result
  }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const contractResponse: ICreateContractResponse = { contract: null, contractAttributes: [] }
    const { invitation, templateId, orderId, rolesOfCreator, ...contractData } = createContractDto
    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    const contractRecord = await this.createEmptyContract({ ...contractData }, user)
    if (invitation && invitation.length > 0) {
      invitation.push({
        email: user.email,
        permission: {
          CHANGE_STATUS_CONTRACT: true,
          EDIT_CONTRACT: true,
          INVITE_PARTICIPANT: true,
          READ_CONTRACT: true,
          SET_OWNER_PARTY: true,
          ROLES: rolesOfCreator
        },
        messages: invitation[0].messages ? invitation[0].messages : '',
        userId: user.id,
        status: ParticipantStatus.ACCEPTED
      })
      await this.participantsService.sendInvitation(
        { invitation, contractName: contractRecord.contractTitle, contractId: contractRecord.id },
        user
      )
    }
    contractResponse.contract = contractRecord
    if (templateId) {
      if (!(await this.templateContractsService.findOneById(templateId)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
      contractResponse.contractAttributes = await this.createContractAttributesByTemplateId(
        contractRecord.id,
        templateId,
        createContractDto.isCreateAttributeValue,
        user
      )
      // if ((!userId && supplierId) || (userId && !supplierId))
      //   throw new NotFoundException({ message: 'User or supplier information not provided' })
      // else if (!userId && !supplierId)
      //   contractResponse.contractAttributes = await this.createContractAttributesByTemplateId(
      //     contractRecord.id,
      //     templateId ? templateId : (await this.templateContractsService.findFirst()).id,
      //     user
      //   )
      // else {
      //   const _user = await this.usersService.findOneById(userId)
      //   const supplier = await this.suppliersService.findOneById(supplierId)
      //   if (!_user || !supplier) throw new NotFoundException({ message: 'User or supplier not found' })
      //   contractResponse.contractAttributes = await this.createContractAttributesByTemplateId(
      //     contractRecord.id,
      //     templateId ? templateId : (await this.templateContractsService.findFirst()).id,
      //     user,
      //     _user,
      //     supplier
      //   )
      // }
    }

    return contractResponse
  }

  async handleDeployContract(contractId: string) {
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    await this.contractAttributesService.createContractAttributesInBlockchain({ contractId, contractAttributes })
  }

  async getContractsByUserId(user: IUser) {
    const participants = await this.participantsService.findAllByUserId(user.id)
    let contracts: Contract[] = await Promise.all(
      participants.map(async (participant) => await this.findOneById(participant.contractId))
    )

    contracts = (
      await Promise.all(
        contracts.map(async (contract: Contract) => {
          const result: Contract[] = []
          let updated = contract
          await Promise.all(
            contract.stages.map(async (stage: any) => {
              const now = new Date().getTime()
              const deliveryTime = new Date(stage.deliveryAt).getTime()
              const sub = Math.floor((now - deliveryTime) / 60000)
              if (sub > 60) {
                updated = await this.update(
                  { id: contract.id, stage: { id: stage.id, status: EStageStatus.OUT_OF_DATE } },
                  user
                )
              }
            })
          )
          result.push(updated)
          return result
        })
      )
    ).flat()

    return { contracts, participants }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async findOneById(id: string) {
    const contract = await this.prismaService.client.contract.findFirst({ where: { id } })
    return contract
  }

  async getContractDetailsById(
    contractId: string,
    user?: IUser
  ): Promise<{ contract: Contract; contractAttributes: IContractAttributeResponse[]; participants: Participant[] }> {
    const contract = await this.findOneById(contractId)
    if (!contract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const contractAttributes = await this.contractAttributesService.findAllByContractId(contractId)
    const participants = await this.participantsService.findAllByContractId(contractId, user)

    return { contract, contractAttributes, participants }
  }

  async update(updateContractDto: UpdateContractDto, user: IUser) {
    const { stage, stages, ...rest } = updateContractDto
    const find = await this.findOneById(updateContractDto.id)
    if (!find) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const newStages: IStage[] = []

    const participantOfcontract = await this.participantsService.findAllByContractId(updateContractDto.id)
    if (stages && !stage) {
      const sender = participantOfcontract.find(
        (item: any) =>
          ERoleParticipant[item.permission.ROLES as keyof typeof ERoleParticipant] === ERoleParticipant.SENDER
      )
      const receiver = participantOfcontract.find(
        (item: any) =>
          ERoleParticipant[item.permission.ROLES as keyof typeof ERoleParticipant] === ERoleParticipant.RECEIVER
      )
      if (!sender || sender.userId === null || sender.userId === '')
        throw new NotFoundException({ message: 'The sender has not been invited or has not agreed to participate' })
      if (!receiver || receiver.userId === null || receiver.userId === '')
        throw new NotFoundException({ message: 'The receiver has not been invited or has not agreed to participate' })
      stages.map((item: any) => {
        newStages.push({
          ...item,
          id: this.commonService.uuidv4(),
          requestBy: sender.User.addressWallet,
          requestTo: receiver.User.addressWallet,
          createdAt: new Date(),
          status: EStageStatus.ENFORCE
        })
      })
    } else if (!stages && stage)
      find.stages.map((item: any) => {
        if (item.id === stage.id)
          newStages.push({
            ...item,
            description: stage.description ? stage.description : item.description,
            status: stage.status ? stage.status : item.status,
            percent: stage.percent ? stage.percent : item.percent
          })
        else newStages.push(item)
      })
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const contract = await this.prismaService.client.contract.update({
      where: { id: updateContractDto.id },
      data: {
        ...(rest as any),
        stages: stage || stages ? (stage && !stages ? newStages : [...find.stages, ...newStages]) : find.stages,
        updatedBy
      }
    })

    return contract
  }

  async updateContractAttribute(updateContractAttribute: UpdateContractAttributeDto, user: IUser) {
    const isContractExist = await this.prismaService.client.contract.findUnique({
      where: { id: updateContractAttribute.id }
    })
    if (!isContractExist) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

    await Promise.all([
      updateContractAttribute.updatedAttributes.map(async (item) => {
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
            await this.contractAttributesService.create(
              {
                contractId: updateContractAttribute.id,
                value: item.value,
                type: item.type,
                index: item.index
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
            await this.contractAttributesService.update(
              {
                id: item.id,
                value: item.value,
                type: item.type,
                index: item.index
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
    isCreateAttributeValue: boolean,
    user: IUser,
    _user?: User,
    supplier?: Suppliers & { User: User }
  ): Promise<IContractAttributeResponse[]> {
    const template = await this.templateContractsService.findOneById(templateContractId)
    if (!template) throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
    const getAllContractAttributes: ContractAttribute[] = await Promise.all(
      template.contractAttributes.map(async (element) => {
        return await this.prismaService.client.contractAttribute.findUnique({
          where: { id: element },
          include: { ContractAttributeValue: true }
        })
      })
    )
    const allContractAttributes: any = getAllContractAttributes.sort((a, b) => a.index - b.index)

    const contractAttributes: any[] = []
    const isInfoParty = { index: -1, role: '' }

    allContractAttributes.forEach((contractAttribute: any, index: number) => {
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
                value: _user && supplier ? (isInfoParty.role === 'Customer' ? 'Empty' : supplier.name) : 'Empty',
                type: contractAttribute.type
              })
              break
            case isInfoParty.index + 2:
              contractAttributes.push({
                property: contractAttribute.value,
                value:
                  _user && supplier ? (isInfoParty.role === 'Customer' ? _user.name : supplier.User.name) : 'Empty',
                type: contractAttribute.type
              })
              break
            case isInfoParty.index + 3:
              contractAttributes.push({
                property: contractAttribute.value,
                value:
                  _user && supplier
                    ? isInfoParty.role === 'Customer'
                      ? _user.address
                        ? _user.address
                        : 'Empty'
                      : supplier.address
                    : 'Empty',
                type: contractAttribute.type
              })
              break
            default:
              contractAttributes.push({
                property: contractAttribute.value,
                value:
                  _user || supplier
                    ? isInfoParty.role === 'Customer'
                      ? _user.phoneNumber
                      : supplier.User.phoneNumber
                    : 'Empty',
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
              value: _user ? _user.addressWallet : 'Empty',
              type: contractAttribute.type
            })
          else if (contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE)
            contractAttributes.push({
              property: contractAttribute.value,
              value: supplier ? supplier.User.addressWallet : 'Empty',
              type: contractAttribute.type
            })
          else
            contractAttributes.push({
              property: contractAttribute.value,
              value: isCreateAttributeValue === true ? contractAttribute.ContractAttributeValue.value : 'Empty',
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
        await this.prismaService.client.contractAttributeValue.deleteMany({
          where: { contractAttributeId: item.id }
        })
        await this.prismaService.client.contractAttribute.deleteMany({ where: { id: item.id } })
      })
    ])
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }

  //   async compareAttribute(contractId: string): Promise<boolean> {
  //      const inContract = await this.getContractDetailsById(contractId)
  //      const inBlockChain = await this.prismaService.client.contractAttributeInBlockchain.findMany({ where: { contractId }, include: { ContractAttributeValueInBlockchain: true } })
  //      const
  //      return true
  //   }

  //   async getContractDetailsInBlockchainById(contractId: string) {
  //      const
  //   }
}
