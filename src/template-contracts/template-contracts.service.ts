import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { IExecutor } from 'src/interfaces/executor.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private contractAttributeValuesService: ContractAttributeValuesService,
    private contractAttributeService: ContractAttributesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { contractTitle, contractAttributeValues } = createTemplateContractDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }

    const handleContractAttributes = await Promise.all(
      contractAttributeValues.map(async (contractAttributeValue) => {
        return await this.contractAttributeService.findOneById(contractAttributeValue.contractAttributeId)
      })
    )

    if (handleContractAttributes.includes(null))
      throw new NotFoundException(RESPONSE_MESSAGES.ONE_OF_THE_CONTRACT_ATTRIBUTE_IS_NOT_FOUND)

    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        contractTitle,
        updatedAt: null,
        createdBy
      }
    })

    await Promise.all(
      contractAttributeValues.map(async (contractAttributeValue) => {
        await this.contractAttributeValuesService.create(
          {
            ...contractAttributeValue,
            templateContractId: templateContract.id
          },
          user,
          false
        )
      })
    )
    return 'This action adds a new templateContract'
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
