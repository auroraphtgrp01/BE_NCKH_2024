import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IContractAttributeResponse, ICreateContractAttributeRecord } from 'src/interfaces/contract-attribute.interface'

@Injectable()
export class ContractAttributesService {
  constructor(@Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createContractAttributeDto: CreateContractAttributeDto, user: IUser) {
    const { contractId, templateContractId, ...rest } = createContractAttributeDto

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const data: ICreateContractAttributeRecord = { ...rest }

    if (contractId) data.Contract = { connect: { id: contractId } }
    else data.TemplateContract = { connect: { id: templateContractId } }
    console.log(data)

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
      isCreated: true,
      createdBy
    }

    return result
  }

  findAll() {
    return `This action returns all contractAttributes`
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

  update(id: number, updateContractAttributeDto: UpdateContractAttributeDto) {
    return `This action updates a #${id} contractAttribute`
  }

  remove(id: number) {
    return `This action removes a #${id} contractAttribute`
  }
}
