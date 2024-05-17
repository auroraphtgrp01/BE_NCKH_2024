import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => ContractAttributesService)) private contractAttributesService: ContractAttributesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { name, contractAttributes } = createTemplateContractDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    const isExist = await Promise.all(
      contractAttributes.map(async (contractAttributeId) => {
        if (!(await this.contractAttributesService.findOneById(contractAttributeId))) return false
        return true
      })
    )
    if (isExist.includes(false))
      throw new NotFoundException(RESPONSE_MESSAGES.ONE_OF_THE_CONATRACT_ATTRIBUTES_DOES_NOT_EXIST)

    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        name,
        path: createTemplateContractDto.path ? createTemplateContractDto.path : null,
        contractAttributes: contractAttributes,
        createdBy,
        updatedAt: null
      }
    })

    return { templateContract }
  }

  async findOneById(id: string) {
    const templateContract = await this.prismaService.client.templateContract.findUnique({ where: { id } })
    return templateContract
  }

  async getTemplateContractAttributes(templateId: string) {
    const contractAttributes = await this.contractAttributesService.findAllByTemplateId(templateId)
    return contractAttributes
  }

  async findAll() {
    return await this.contractAttributesService.findAll()
  }

  async findFirst() {
    return await this.prismaService.client.templateContract.findFirst()
  }
  findOne(id: number) {
    return `This action returns a #${id} templateContract`
  }

  update(id: number, updateTemplateContractDto: UpdateTemplateContractDto) {
    return `This action updates a #${id} templateContract`
  }

  remove(id: number) {
    return `This action removes a #${id} templateContract`
  }
}
