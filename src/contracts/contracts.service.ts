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
import { ICreateInvitation, ICreateParticipant } from 'src/interfaces/participant.interface'
import { CommonService } from 'src/commons/common.service'
import { OrdersService } from 'src/orders/orders.service'
@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly templateContractsService: TemplateContractsService,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ContractAttributesService))
    private readonly contractAttributesService: ContractAttributesService,
    private readonly contractAttributeValuesService: ContractAttributeValuesService,
    private readonly participantsService: ParticipantsService,
    private readonly commonService: CommonService,
    private readonly ordersService: OrdersService
  ) { }
  async createEmptyContract(contractData: CreateEmptyContractDto, user: IUser) {
    const { addressWallet, name, type, parentId } = contractData
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    const contract = await this.prismaService.client.contract.create({
      data: {
        addressWallet,
        contractTitle: name,
        status: contractData.status
          ? (contractData.status as Exact<contractStatus, contractStatus>)
          : (contractStatus.PENDING as Exact<contractStatus, contractStatus>),
        type: type ? type : EContractType.CONTRACT,
        createdBy,
        updatedAt: null,
        parentId: parentId ? parentId : null,
        contractAddress: contractData.contractAddress ? contractData.contractAddress : null
      }
    })

    return contract
  }

  async createDisputeContract(createDisputeContractDto: CreateDisputeContractDto, user: IUser) {
    const { totalAmount, customer, supplier, ...rest } = createDisputeContractDto
    const userSender: User = await this.usersService.findOneByAddressWallet(customer)
    const userReceiver: User = await this.usersService.findOneByAddressWallet(supplier)
    const newContract = await this.createEmptyContract(
      { ...rest, name: 'HỢP ĐỒNG TRANH CHẤP', type: EContractType.DISPUTE, status: 'PARTICIPATED' },
      user
    )
    const contractAttributeInfoArr = [
      {
        keyId: '169e82db-94ae-4843-b462-51044fef55e3',
        value: userSender.name
      },
      {
        keyId: '26bf8d25-d040-410f-8fb4-60093c66007c',
        value: userSender.phoneNumber
      },
      {
        keyId: '71475e26-b680-48d7-9ec2-736116f3df16',
        value: userSender.addressWallet
      },
      {
        keyId: 'cdee2a3b-19b7-4140-8240-17114a2ba467',
        value: userReceiver.name
      },
      {
        keyId: 'bc38a62d-bed7-49d8-855f-05927f0e1fa9',
        value: userReceiver.phoneNumber
      },
      {
        keyId: 'c97fa3aa-b7da-492c-8275-0f92bb90f4a8',
        value: userReceiver.addressWallet
      }
    ]
    this.createContractAttributeAndValueByTemplateId(
      newContract.id,
      'bfaff943-4890-41f4-b6fc-41792307fb80',
      user,
      contractAttributeInfoArr
    )

    const participantCreates: ICreateParticipant[] = [
      {
        email: userSender.email,
        contractId: newContract.id,
        permission: {
          CHANGE_STATUS_CONTRACT: true,
          EDIT_CONTRACT: true,
          INVITE_PARTICIPANT: true,
          READ_CONTRACT: true,
          SET_OWNER_PARTY: false,
          ROLES: 'SENDER' as ERoleParticipant
        },
        userId: userSender.id,
        status: ParticipantStatus.ACCEPTED
      },
      {
        email: userReceiver.email,
        contractId: newContract.id,
        permission: {
          CHANGE_STATUS_CONTRACT: true,
          EDIT_CONTRACT: true,
          INVITE_PARTICIPANT: true,
          READ_CONTRACT: true,
          SET_OWNER_PARTY: false,
          ROLES: 'RECEIVER' as ERoleParticipant
        },
        userId: userReceiver.id,
        status: ParticipantStatus.ACCEPTED
      }
    ]
    participantCreates.map(async (item: any) => {
      return await this.participantsService.create(item, user)
    })
    return newContract
  }

  async createContractBySurveyId(surveyId: string, user: IUser) {
    const newContract = await this.createEmptyContract(
      {
        name: 'HỢP ĐỒNG GIAO DỊCH',
        addressWallet: user.addressWallet,
        status: 'PARTICIPATED'
      },
      user
    )
    const surveyInfo = await this.ordersService.findOneById(surveyId)

    const sum = surveyInfo.order.products.reduce((acc: number, item: any) => {
      return acc + (item.price + item.taxPrice) * item.quantity - item.discount
    }, 0)
    const contractAttributeInfoArr = [
      {
        keyId: '28b2a95f-9d48-4261-bf38-68cf89cf6f31',
        value: 'Empty'
      },
      {
        keyId: '15b3b476-3b64-4f28-b8e3-b3dab50bf656',
        value: surveyInfo.order.User.name
      },
      {
        keyId: '25f3a94b-5415-4e39-8420-d1f626701953',
        value: surveyInfo.order.User.address ? surveyInfo.order.User.address : 'Empty'
      },
      {
        keyId: '27292812-30a6-464b-b930-d687ed316ee7',
        value: surveyInfo.order.User.phoneNumber
      },
      {
        keyId: 'b5c42fa3-6f5a-462f-ae34-ca9cfde430d1',
        value: surveyInfo.order.User.email
      },
      {
        keyId: '58a5f451-ca67-44de-9e5e-89cbfd675575',
        value: 'Empty'
      },
      {
        keyId: 'd1d3d832-08a3-4276-bf92-0982a729d9bd',
        value: surveyInfo.order.User.addressWallet
      },
      //-----------
      {
        keyId: '28b2a95f-9d48-4261-bf38-68cf89cf6f31',
        value: surveyInfo.supplier.name
      },
      {
        keyId: '70b06a22-689b-46fd-9122-1fbd1f2f9b90',
        value: surveyInfo.supplier.User.name
      },
      {
        keyId: 'ac3e2efe-ae28-49a4-a5a7-a006efad6116',
        value: surveyInfo.supplier.User.address ? surveyInfo.supplier.User.address : 'Empty'
      },
      {
        keyId: 'e3ca49cc-3534-4739-a992-dd461fa6d4fb',
        value: surveyInfo.supplier.phoneNumber
      },
      {
        keyId: 'b08dbfdb-5ff0-4269-b831-d467e6ca7d84',
        value: surveyInfo.supplier.email
      },
      {
        keyId: '776acbb5-c407-4bc0-92b3-ac5baa27ab3a',
        value: surveyInfo.supplier.taxCode
      },
      {
        keyId: '6ed5eec4-a4c5-4f88-b008-d8c0bf35e5d2',
        value: surveyInfo.supplier.User.addressWallet
      },
      {
        keyId: '2e2f9b77-82ed-47fd-9b1d-9095b11a8a98',
        value: String(sum)
      }
    ]

    await this.createContractAttributeAndValueByTemplateId(
      newContract.id,
      '5828a8b5-0582-4f3a-83b3-e8b634d290f4',
      user,
      contractAttributeInfoArr
    )
    const participantCreates: ICreateParticipant[] = [
      {
        email: user.email,
        contractId: newContract.id,
        permission: {
          CHANGE_STATUS_CONTRACT: true,
          EDIT_CONTRACT: true,
          INVITE_PARTICIPANT: true,
          READ_CONTRACT: true,
          SET_OWNER_PARTY: false,
          ROLES: 'SENDER' as ERoleParticipant
        },
        userId: user.id,
        status: ParticipantStatus.ACCEPTED
      },
      {
        email: surveyInfo.supplier.User.email,
        contractId: newContract.id,
        permission: {
          CHANGE_STATUS_CONTRACT: true,
          EDIT_CONTRACT: true,
          INVITE_PARTICIPANT: true,
          READ_CONTRACT: true,
          SET_OWNER_PARTY: false,
          ROLES: 'RECEIVER' as ERoleParticipant
        },
        userId: surveyInfo.supplier.User.id,
        status: ParticipantStatus.ACCEPTED
      }
    ]
    participantCreates.map(async (item: any) => {
      return await this.participantsService.create(item, user)
    })
    return { contract: newContract }
  }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const contractResponse: ICreateContractResponse = { contract: null, contractAttributes: [] }
    const { invitation, templateId, rolesOfCreator, ...contractData } = createContractDto
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
    const { stage, stages, disputedContractId, winnerAddressWallet, ...rest } = updateContractDto
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
        disputedContractId: disputedContractId ? disputedContractId : null,
        winnerAddressWallet: winnerAddressWallet ? winnerAddressWallet : null,
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

  async createContractAttributeAndValueByTemplateId(
    contractId: string,
    templateContractId: string,
    user: IUser,
    modifiedAttributes: {
      keyId: string
      value: string
    }[]
  ) {
    const contractAttributes = await this.prismaService.client.templateContract.findFirst({
      where: {
        id: templateContractId
      },
      select: {
        contractAttributes: true
      }
    })

    const contractAttributeIds = contractAttributes?.contractAttributes || []

    await Promise.all(
      contractAttributeIds.map(async (itemId: any) => {
        const data = await this.prismaService.client.contractAttribute.findFirst({
          where: {
            id: itemId
          },
          include: { ContractAttributeValue: true }
        })

        const attributeId = (
          await this.contractAttributesService.create(
            {
              type: data.type,
              value: data.value,
              contractId,
              index: data.index
            },
            user
          )
        ).id

        const modifiedItem = modifiedAttributes.find((attr) => attr.keyId === itemId)

        if (modifiedItem) {
          await this.contractAttributeValuesService.create(
            {
              value: modifiedItem.value,
              contractAttributeId: attributeId
            },
            user
          )
        } else {
          await this.contractAttributeValuesService.create(
            {
              value: data.ContractAttributeValue ? data.ContractAttributeValue?.value : 'Empty',
              contractAttributeId: attributeId
            },
            user
          )
        }
      })
    )
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
          where: { id: element.id },
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

  async compareAttribute(contractId: string) {
    const inContract = await this.getContractDetailsById(contractId).then((res: any) =>
      this.commonService.convertToTypeContractAttributesResponse(res.contractAttributes)
    );

    const inBlockChain = await this.prismaService.client.contractAttributeInBlockchain.findMany({
      where: { contractId },
      include: { ContractAttributeValueInBlockchain: true }
    });

    const x = this.commonService.convertToTypeContractAttributesResponse(inBlockChain);

    if (x.length !== inContract.length) return { result: false };

    for (const item of x) {
      const contractAttribute = inContract.find((attr) => attr.index === item.index);
      if (!contractAttribute || contractAttribute.value !== item.value || contractAttribute.property !== item.property) {
        console.log('contractAttribute', contractAttribute, '', item);
        return { result: false };
      }
    }

    return { result: true };
  }
}
