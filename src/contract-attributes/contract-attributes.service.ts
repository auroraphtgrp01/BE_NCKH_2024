import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { TypeContractAttributeValue } from 'src/constants/enum.constant'
import { ICreateContractAttribute } from 'src/interfaces/contract-attribute.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { v4 as uuidv4 } from 'uuid'
import { CommonService } from 'src/common.service'
import { ContractAttributeValue } from '@prisma/client'

@Injectable()
export class ContractAttributesService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private contractAttributeValuesService: ContractAttributeValuesService,
    private commonService: CommonService
  ) {}
  async create(createContractAttributeDto: CreateContractAttributeDto, user: IUser, isEmpty?: boolean) {
    const { contractId, templateContractId, valueAttribute, isContractEmpty, ...rest } = createContractAttributeDto

    if (
      rest.type !== TypeContractAttributeValue.CONTRACT_ATTRIBUTE &&
      rest.type !== TypeContractAttributeValue.CONTRACT_TITLE
    )
      throw new UnauthorizedException(RESPONSE_MESSAGES.TYPE_CONTRACT_ATTRIBUTE_IS_NOT_VALID)

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const data: ICreateContractAttribute = { ...rest, createdBy }
    if (contractId) {
      if (!(await this.commonService.findOneContractById(contractId)))
        throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
      data.Contract = { connect: { id: contractId } }
    } else {
      if (!(await this.commonService.findOneTemplateContractById(templateContractId)))
        throw new NotFoundException(RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND)
      data.TemplateContract = { connect: { id: templateContractId } }
    }

    const contractAttribute = await this.prismaService.client.contractAttribute.create({
      data: {
        ...data,
        updatedAt: null
      }
    })
    let contractAttributeValue: ContractAttributeValue = null
    if (
      (!isContractEmpty || isContractEmpty !== true) &&
      contractAttribute.type === TypeContractAttributeValue.CONTRACT_ATTRIBUTE
    ) {
      contractAttributeValue = await this.contractAttributeValuesService.create(
        { value: valueAttribute, contractAttributeId: contractAttribute.id },
        user
      )
    }

    return {
      id: contractAttribute.id,
      property: contractAttribute.name,
      value: {
        id: contractAttributeValue !== null ? contractAttributeValue.id : null,
        idArea: contractAttribute.idArea,
        valueAttribute: contractAttributeValue !== null ? contractAttributeValue.value : null,
        type: contractAttribute.type
      },
      isCreated: true
    }
  }

  findAll() {
    return `This action returns all contractAttributes`
  }

  async findOne(payload: string) {
    const contractAttribute = await this.prismaService.client.contractAttribute.findFirst({
      where: { name: payload }
    })
    return contractAttribute
  }

  update(id: number, updateContractAttributeDto: UpdateContractAttributeDto) {
    return `This action updates a #${id} contractAttribute`
  }

  remove(id: number) {
    return `This action removes a #${id} contractAttribute`
  }
}
