import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { IExecutor } from 'src/interfaces/executor.interface'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => CommonService)) private commonService: CommonService,
    @Inject(forwardRef(() => ContractAttributesService)) private contractAttributesService: ContractAttributesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { name, contractAttributes } = createTemplateContractDto

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    // const resultContractAttributes = await this.commonService.createContractAttributes({ contractAttributes }, user)
    // const arrId: string[] = resultContractAttributes.map((item) => item.id)
    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        name,
        path: 'https://picture/123354',
        ContractAttribute: [],
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
