import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { IContractAttributeResponse, ICreateContractAttributeRecord } from 'src/interfaces/contract-attribute.interface'
import { CommonService } from 'src/commons/common.service'
import { constants } from 'buffer'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'

@Injectable()
export class ContractAttributesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    @Inject(forwardRef(() => TemplateContractsService))
    private readonly templateContractsService: TemplateContractsService
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

  findAll() {
    return `This action returns all contractAttributes`
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
      templateContract.ContractAttribute.map(async (item) => {
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
