import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { v4 as uuidv4 } from 'uuid'
import { TypeContractAttributeValue } from 'src/constants/enum.constant'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private contractAttributeService: ContractAttributesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { contractTitle, contractAttributes } = createTemplateContractDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        contractTitle,
        createdBy,
        updatedAt: null
      }
    })

    const resultContractAttributes = await Promise.all(
      contractAttributes.map(async (contractAttribute) => {
        if (contractAttribute.type === TypeContractAttributeValue.CONTRACT_TITLE && contractAttribute.valueAttribute)
          throw new NotFoundException(
            `Contract with name ${contractAttribute.name} is not allowed to have value attribute`
          )
        return await this.contractAttributeService.create(
          { ...contractAttribute, templateContractId: templateContract.id },
          user
        )
      })
    )
    return { templateContract, contractAttributes: resultContractAttributes }
  }

  async findOneById(id: string) {
    const templateContract = await this.prismaService.client.templateContract.findUnique({ where: { id } })
    return templateContract
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
