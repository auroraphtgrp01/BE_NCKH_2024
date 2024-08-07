import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractAttributeDto, CreateContractAttributesDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import {
  IContractAttribute,
  ICreateContractAttributeRecord,
  IDataContractAttribute
} from 'src/interfaces/contract-attribute.interface'
import { CommonService } from 'src/commons/common.service'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { ContractsService } from 'src/contracts/contracts.service'

@Injectable()
export class ContractAttributesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    @Inject(forwardRef(() => TemplateContractsService))
    private readonly templateContractsService: TemplateContractsService,
    @Inject(forwardRef(() => ContractAttributeValuesService))
    private readonly contractAttributeValueService: ContractAttributeValuesService,
    @Inject(forwardRef(() => ContractsService))
    private readonly contractsService: ContractsService
  ) {}
  async create(createContractAttributeDto: CreateContractAttributeDto, user: IUser) {
    const { contractId, ...rest } = createContractAttributeDto

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const data: ICreateContractAttributeRecord = { ...rest }

    if (contractId) data.Contract = { connect: { id: contractId } }

    const contractAttribute = await this.prismaService.client.contractAttribute.create({
      data: {
        ...data,
        createdBy,
        updatedAt: null
      }
    })

    const result: IContractAttribute = {
      id: contractAttribute.id,
      value: contractAttribute.value as string,
      type: contractAttribute.type,
      createdBy
    }

    return result
  }

  async createInBlockchain(createContractAttributeDto: CreateContractAttributeDto) {
    const { contractId, ...rest } = createContractAttributeDto

    const data: ICreateContractAttributeRecord = { ...rest }

    if (contractId) data.Contract = { connect: { id: contractId } }

    const contractAttribute = await this.prismaService.client.contractAttributeInBlockchain.create({
      data: {
        ...data
      }
    })

    const result = {
      id: contractAttribute.id,
      value: contractAttribute.value,
      type: contractAttribute.type
    }

    return result
  }

  async createContractAttributes(
    createContractAttributesDto: CreateContractAttributesDto,
    user: IUser,
    index: number = 0
  ) {
    const { contractAttributes, contractId } = createContractAttributesDto
    const contractAttributeRecords: IContractAttribute[] = []
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    if (contractId && !(await this.prismaService.client.contract.findUnique({ where: { id: contractId } })))
      throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
    for (const contractAttribute of contractAttributes) {
      if (!Object.values(ETypeContractAttribute).includes(contractAttribute.type as ETypeContractAttribute)) {
        throw new BadRequestException(RESPONSE_MESSAGES.TYPE_CONTRACT_ATTRIBUTE_IS_NOT_VALID)
      }
      const data: IDataContractAttribute = {
        value: null,
        type: contractAttribute.type
      }
      if (contractId) data.contractId = contractId
      data.index = index
      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        data.value = contractAttribute.property
        const contractAttributeRecord = await this.create(data, user)
        const contractAttributeValueRecord = await this.contractAttributeValueService.create(
          {
            value: contractAttribute.value !== 'Empty' ? contractAttribute.value : '',
            contractAttributeId: contractAttributeRecord.id
          },
          user
        )
        const result: IContractAttribute = {
          id: contractAttributeRecord.id,
          property: contractAttributeRecord.value,
          value: contractAttributeValueRecord.value,
          type: contractAttributeRecord.type,
          createdBy
        }
        contractAttributeRecords.push(result)
      } else {
        data.value = contractAttribute.value
        const contractAttributeRecord = await this.create(data, user)
        contractAttributeRecords.push(contractAttributeRecord)
      }
      index++
    }

    return contractAttributeRecords
  }

  async createContractAttributesInBlockchain(createContractAttributesDto: CreateContractAttributesDto) {
    const { contractAttributes, contractId } = createContractAttributesDto
    let index: number = 0
    for (const contractAttribute of contractAttributes) {
      const data: IDataContractAttribute = {
        value: null,
        type: contractAttribute.type
      }
      if (contractId) data.contractId = contractId
      data.index = index
      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        data.value = contractAttribute.property
        const contractAttributeRecord = await this.createInBlockchain(data)
        await this.contractAttributeValueService.createInBlockchain({
          value: contractAttribute.value !== 'Empty' ? contractAttribute.value : '',
          contractAttributeId: contractAttributeRecord.id
        })
      } else {
        data.value = contractAttribute.value
        await this.createInBlockchain(data)
      }
      index++
    }
  }

  async findAllByContractId(contractId: string): Promise<IContractAttribute[]> {
    const contractAttributes = await this.prismaService.client.contractAttribute
      .findMany({
        where: { contractId },
        include: { ContractAttributeValue: true },
        orderBy: {
          index: 'asc'
        }
      })
      .then((contractAttributes) => this.commonService.convertToTypeContractAttributesResponse(contractAttributes))

    return contractAttributes
  }

  async findAllInBlockchainByContractId(contractId: string): Promise<IContractAttribute[]> {
    const contractAttributes = await this.prismaService.client.contractAttributeInBlockchain
      .findMany({
        where: { contractId },
        include: { ContractAttributeValueInBlockchain: true },
        orderBy: {
          index: 'asc'
        }
      })
      .then((contractAttributes) => this.commonService.convertToTypeContractAttributesResponse(contractAttributes))

    return contractAttributes
  }

  async findAllByTemplateId(templateContractId: string) {
    const { templateContract } = await this.templateContractsService.findOneById(templateContractId)
    const contractAttributes = await Promise.all(
      templateContract.contractAttributes.map(async (item) => {
        const contractAttribute = await this.prismaService.client.contractAttribute.findFirst({
          where: { id: item },
          include: { ContractAttributeValue: true }
        })
        return contractAttribute
      })
    )
    const sorted = contractAttributes.sort((a, b) => a.index - b.index)
    const result = await Promise.all(this.commonService.convertToTypeContractAttributesResponse(sorted))
    return result
  }

  async findOneById(id: string) {
    return await this.prismaService.client.contractAttribute.findUnique({
      where: { id },
      include: { ContractAttributeValue: true, Contract: true }
    })
  }

  async findOne(payload: string) {
    const contractAttribute = await this.prismaService.client.contractAttribute.findFirst({
      where: { value: payload }
    })
    return contractAttribute
  }

  async update(updateContractAttributeDto: UpdateContractAttributeDto, user: IUser) {
    const { id, ...data } = updateContractAttributeDto
    if (id && !(await this.findOneById(id)))
      throw new BadRequestException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_NOT_FOUND)
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const contractAttribute = await this.prismaService.client.contractAttribute.update({
      where: { id },
      data: { ...data, updatedBy }
    })

    return contractAttribute
  }

  async remove(id: string, user: IUser) {
    const contractAttribute = await this.prismaService.client.contractAttribute.findUnique({ where: { id } })
    if (!contractAttribute) throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_IS_NOT_FOUND)

    const deletedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    await Promise.all([
      contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
      contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
      contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
      contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
      contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
      contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT ||
      contractAttribute.type === ETypeContractAttribute.CONTRACT_PAYMENT_STAGE
        ? this.contractAttributeValueService.remove(id, user)
        : null,
      this.prismaService.client.contractAttribute.update({ where: { id }, data: { deletedBy } }),
      this.prismaService.client.contractAttribute.delete({ where: { id } })
    ])
    return { message: RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_DELETED_SUCCESSFULLY }
  }
}
