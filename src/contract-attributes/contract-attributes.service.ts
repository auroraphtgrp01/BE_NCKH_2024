import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IContractAttributeResponse, ICreateContractAttributeRecord } from 'src/interfaces/contract-attribute.interface'
import { ETypeContractAttribute } from 'src/constants/enum.constant'

@Injectable()
export class ContractAttributesService {
  constructor(@Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createContractAttributeDto: CreateContractAttributeDto, user: IUser) {
    const { contractId, templateContractId, ...rest } = createContractAttributeDto

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const data: ICreateContractAttributeRecord = { ...rest }

    if (contractId) data.Contract = { connect: { id: contractId } }
    else data.TemplateContract = { connect: { id: templateContractId } }

    if (!data.Contract && !data.TemplateContract)
      throw new BadRequestException(RESPONSE_MESSAGES.THE_CONTRACT_OR_CONTRACT_TEMPLATE_IS_UNDEFINED)
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
        include: { ContractAttributeValue: true }
      })
      .then((contractAttributes) => {
        const result: IContractAttributeResponse[] = []
        for (const contractArribute of contractAttributes) {
          if (
            contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
            contractArribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
            contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE ||
            contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET
          ) {
            result.push({
              id: contractArribute.id,
              property: contractArribute.value,
              value: contractArribute.ContractAttributeValue.value,
              type: contractArribute.type,
              createdBy: contractArribute.createdBy,
              updatedBy: contractArribute.updatedBy
            })
          } else {
            result.push({
              id: contractArribute.id,
              value: contractArribute.value,
              type: contractArribute.type,
              createdBy: contractArribute.createdBy,
              updatedBy: contractArribute.updatedBy
            })
          }
        }
        return result
      })
    return contractAttributes
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
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email }
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
