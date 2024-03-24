import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateContractTypeDto } from './dto/create-contract_type.dto'
import { UpdateContractTypeDto } from './dto/update-contract_type.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Injectable()
export class ContractTypesService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}

  async create(createContractTypeDto: CreateContractTypeDto, user: IUser) {
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const contractType = await this.prismaService.client.contractType.create({
      data: {
        name: createContractTypeDto.name,
        description: createContractTypeDto.description,
        createdBy
      }
    })
    return contractType
  }

  async findAll(page: number, limit: number, order: 'asc' | 'desc') {
    const totalItems = await this.prismaService.client.contractType.count()
    const totalPages = Math.ceil(totalItems / limit)
    const contractTypes = await this.prismaService.client.contractType.findMany({
      where: { deletedAt: null },
      skip: (page - 1) * limit,
      take: limit * 1,
      orderBy: {
        id: order
      }
    })
    return {
      contractTypes,
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  }

  async findOne(id: string) {
    const contractType = await this.prismaService.client.contractType.findUnique({ where: { id, deletedAt: null } })
    return contractType
  }

  async update(updateContractTypeDto: UpdateContractTypeDto, user: IUser) {
    const isContractTypeExists = await this.prismaService.client.contractType.findUnique({
      where: { id: updateContractTypeDto.id, deletedAt: null }
    })
    if (!isContractTypeExists) throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_TYPE_NOT_FOUND_OR_DELETED)

    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const contractType = await this.prismaService.client.contractType.update({
      where: { id: updateContractTypeDto.id },
      data: {
        name: updateContractTypeDto.name,
        description: updateContractTypeDto.description,
        updatedBy
      }
    })
    return contractType
  }

  async remove(id: string, user: IUser) {
    const deletedBy: IExecutor = { id: user.id, name: user.name, email: user.email }

    const isContractTypeExists = await this.prismaService.client.contractType.findUnique({
      where: { id, deletedAt: null }
    })

    if (!isContractTypeExists) throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_TYPE_NOT_FOUND_OR_DELETED)

    const contractType = await this.prismaService.client.contractType.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy }
    })
    return contractType
  }
}
