import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { CommonService } from 'src/common.service'

@Injectable()
export class ContractAttributesService {
  constructor(@Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createContractAttributeDto: CreateContractAttributeDto, user: IUser) {
    const isContractAttributeExist = await this.findOne(createContractAttributeDto.name)
    if (isContractAttributeExist) return isContractAttributeExist

    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    return await this.prismaService.client.contractAttribute.create({
      data: {
        name: createContractAttributeDto.name,
        description: createContractAttributeDto.description ? createContractAttributeDto.description : null,
        createdBy,
        updatedAt: null
      }
    })
  }

  findAll() {
    return `This action returns all contractAttributes`
  }

  async findOneById(id: string) {
    return await this.prismaService.client.contractAttribute.findUnique({ where: { id } })
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
