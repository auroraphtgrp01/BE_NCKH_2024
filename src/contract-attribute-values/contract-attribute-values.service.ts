import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateContractAttributeValueDto } from './dto/create-contract-attribute-value.dto'
import { UpdateContractAttributeValueDto } from './dto/update-contract-attribute-value.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { CommonService } from 'src/common.service'
import { ICreateContractAttributeValue } from 'src/interfaces/contract-attribute-value.interface'

@Injectable()
export class ContractAttributeValuesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private contractAttributesService: ContractAttributesService,
    private commonService: CommonService
  ) {}
  async create(createContractAttributeValueDto: CreateContractAttributeValueDto, user: IUser, isEmpty?: boolean) {
    const { contractId, templateContractId, contractAttributeId, value, description } = createContractAttributeValueDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const data: ICreateContractAttributeValue = {
      value: value,
      description: description ? description : null,
      createdBy,
      ContractAttribute: { connect: { id: contractAttributeId } }
    }

    if ((await this.contractAttributesService.findOneById(contractAttributeId)) === null)
      throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_IS_NOT_FOUND)
    if (contractId) {
      if ((await this.commonService.findOneContractById(contractId)) === null)
        throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND)
      data.Contract = { connect: { id: contractAttributeId } }
    } else {
      if ((await this.commonService.findOneTemplateContractById(templateContractId)) === null)
        throw new NotFoundException(RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND)
      data.TemplateContract = { connect: { id: templateContractId } }
    }
    if (!isEmpty && (value === null || value === undefined || value === ''))
      throw new BadRequestException(RESPONSE_MESSAGES.VALUE_IS_REQUIRED)

    return await this.prismaService.client.contractAttributeValue.create({
      data: {
        ...data,
        updatedAt: null
      }
    })
  }

  findAll() {
    return `This action returns all contractAttributeValues`
  }

  findOne(id: number) {
    return `This action returns a #${id} contractAttributeValue`
  }

  update(id: number, updateContractAttributeValueDto: UpdateContractAttributeValueDto) {
    return `This action updates a #${id} contractAttributeValue`
  }

  remove(id: number) {
    return `This action removes a #${id} contractAttributeValue`
  }
}
