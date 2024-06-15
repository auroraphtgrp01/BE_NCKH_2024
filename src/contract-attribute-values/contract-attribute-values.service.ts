import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractAttributeValueDto } from './dto/create-contract-attribute-value.dto'
import { UpdateContractAttributeValueDto } from './dto/update-contract-attribute-value.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'

@Injectable()
export class ContractAttributeValuesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => ContractAttributesService)) private contractAttributeService: ContractAttributesService
  ) {}
  async create(createContractAttributeValueDto: CreateContractAttributeValueDto, user: IUser) {
    try {
      const { contractAttributeId, value, descriptionOfStage } = createContractAttributeValueDto
      const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
      if (!(await this.contractAttributeService.findOneById(contractAttributeId)))
        throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_NOT_FOUND)
      const contractAttributeValue = await this.prismaService.client.contractAttributeValue.create({
        data: {
          value: value.toString(),
          descriptionOfStage: descriptionOfStage ? descriptionOfStage : null,
          ContractAttribute: { connect: { id: contractAttributeId } },
          createdBy,
          updatedAt: null
        }
      })
      return contractAttributeValue
    } catch (error) {
      console.log('error', error)
    }
  }

  async createInBlockchain(createContractAttributeValueDto: CreateContractAttributeValueDto) {
    const { contractAttributeId, value } = createContractAttributeValueDto
    const contractAttributeValue = await this.prismaService.client.contractAttributeValueInBlockchain.create({
      data: {
        value,
        ContractAttribute: { connect: { id: contractAttributeId } }
      }
    })
    return contractAttributeValue
  }

  findAll() {
    return `This action returns all contractAttributeValues`
  }

  async findOneById(id: string) {
    const contractAttributeValue = await this.prismaService.client.contractAttributeValue.findUnique({
      where: { id: id },
      include: {
        ContractAttribute: true
      }
    })
    return contractAttributeValue
  }

  findOne(id: number) {
    return `This action returns a #${id} contractAttributeValue`
  }

  async update(updateContractAttributeValueDto: UpdateContractAttributeValueDto, user: IUser) {
    const { contractAttributeId, ...data } = updateContractAttributeValueDto
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const contractAttributeValue = await this.prismaService.client.contractAttributeValue.update({
      where: { contractAttributeId },
      data: {
        ...data,
        updatedBy
      }
    })
    return contractAttributeValue
  }

  remove(id: number) {
    return `This action removes a #${id} contractAttributeValue`
  }
}
