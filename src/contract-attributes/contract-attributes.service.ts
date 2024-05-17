import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractAttributeDto, CreateContractAttributesDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import {
  IContractAttributeResponse,
  ICreateContractAttributeRecord,
  IDataContractAttribute
} from 'src/interfaces/contract-attribute.interface'
import { CommonService } from 'src/commons/common.service'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'

@Injectable()
export class ContractAttributesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    @Inject(forwardRef(() => TemplateContractsService))
    private readonly templateContractsService: TemplateContractsService,
    @Inject(forwardRef(() => ContractAttributeValuesService))
    private readonly contractAttributeValueService: ContractAttributeValuesService
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

    const result: IContractAttributeResponse = {
      id: contractAttribute.id,
      value: contractAttribute.value,
      type: contractAttribute.type,
      createdBy
    }

    return result
  }

  async createContractAttributes(createContractAttributesDto: CreateContractAttributesDto, user: IUser) {
    const { contractAttributes, contractId } = createContractAttributesDto
    const contractAttributeRecords: IContractAttributeResponse[] = []
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    if (contractId && !(await this.prismaService.client.contract.findUnique({ where: { id: contractId } })))
      throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
    let i = 0
    for (const contractAttribute of contractAttributes) {
      if (!Object.values(ETypeContractAttribute).includes(contractAttribute.type as ETypeContractAttribute)) {
        throw new BadRequestException(RESPONSE_MESSAGES.TYPE_CONTRACT_ATTRIBUTE_IS_NOT_VALID)
      }

      const data: IDataContractAttribute = {
        value: null,
        type: contractAttribute.type
      }

      if (contractId) data.contractId = contractId

      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        data.value = contractAttribute.property
        const hasHeading = contractAttributeRecords.some(
          (record) =>
            record.type === ETypeContractAttribute.CONTRACT_HEADING_1 ||
            record.type === ETypeContractAttribute.CONTRACT_HEADING_2
        )

        if (!hasHeading) {
          throw new BadRequestException(
            `The content ${contractAttribute.property} cannot be found without a title. Please create a title before generating content!`
          )
        }

        const contractAttributeRecord = await this.create(data, user)

        const contractAttributeValueRecord = await this.contractAttributeValueService.create(
          {
            value: contractAttribute.value !== 'Empty' ? contractAttribute.value : '',
            contractAttributeId: contractAttributeRecord.id
          },
          user
        )
        const result: IContractAttributeResponse = {
          id: contractAttributeRecord.id,
          property: contractAttributeRecord.value,
          value: contractAttributeValueRecord.value,
          type: contractAttributeRecord.type,
          createdBy
        }

        contractAttributeRecords.push(result)
      } else {
        data.value = contractAttribute.value
        if (contractAttributes.filter((item) => item.value === contractAttribute.value).length > 1) {
          throw new BadRequestException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_DUPLICATE)
        }

        const contractAttributeRecord = await this.create(data, user)
        contractAttributeRecords.push(contractAttributeRecord)
      }
      i++
    }

    return contractAttributeRecords
  }

  async findAll() {
    return this.prismaService.client.templateContract.findMany({})
  }

  async findAllByContractId(contractId: string) {
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

  async findAllByTemplateId(templateContractId: string) {
    const templateContract = await this.templateContractsService.findOneById(templateContractId)
    const contractAttributes = await Promise.all(
      templateContract.contractAttributes.map(async (item) => {
        const contractAttribute = await this.prismaService.client.contractAttribute.findFirst({
          where: { id: item }
        })
        return contractAttribute
      })
    )
    const result = await Promise.all(this.commonService.convertToTypeContractAttributesResponse(contractAttributes))
    return result
  }

  async findOneById(id: string) {
    return await this.prismaService.client.contractAttribute.findUnique({ where: { id } })
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

  remove(id: number) {
    return `This action removes a #${id} contractAttribute`
  }
}
