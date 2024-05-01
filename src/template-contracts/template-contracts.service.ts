import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => CommonService)) private commonService: CommonService,
    private readonly contractAttributeService: ContractAttributesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { name, contractAttributes } = createTemplateContractDto
    // const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        name,
        path: 'https://picture/123354',
        // createdBy,
        updatedAt: null
      }
    })

    const resultContractAttributes = await this.commonService.createContractAttributes(
      { contractAttributes, templateContractId: templateContract.id },
      user
    )
    return { templateContract, contractAttributes: resultContractAttributes }
  }

  async findOneById(id: string) {
    const templateContract = await this.prismaService.client.templateContract.findUnique({ where: { id } })
    return templateContract
  }

  async getTemplateContractAttributes(templateId: string) {
    const contractAttributes = await this.contractAttributeService.findAllByTemplateId(templateId)
    return contractAttributes
  }

  findAll() {
    return `This action returns all templateContracts`
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
