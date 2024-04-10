import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { readContract } from 'src/utils/readContract.utils'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto'
import { hashPassword } from 'src/utils/hashPassword'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from './interfaces/IUser.interface'

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createUserDto: CreateUserDto, user: IUser) {
    const isUserExist = await this.prismaService.client.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { addressWallet: createUserDto.addressWallet },
          { indentifyNumber: createUserDto.indentifyNumber }
        ]
      }
    })
    if (isUserExist) {
      throw new HttpException({ message: RESPONSE_MESSAGES.USER_IS_EXIST }, 400)
    }
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    return await this.prismaService.client.user.create({
      data: {
        ...createUserDto,
        createdBy
      }
    })
  }

  async updatePIN(updateUserPINDto: UpdateUserPINDto, id: string) {
    const hashPIN = await hashPassword(updateUserPINDto.PIN)
    return await this.prismaService.client.user.update({
      where: {
        id
      },
      data: {
        PIN: hashPIN
      }
    })
  }

  async findAll(page: number, limit: number, order: 'asc' | 'desc') {
    const totalItems = await this.prismaService.client.user.count()
    const totalPages = Math.ceil(totalItems / limit)
    const users = await this.prismaService.client.user.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      orderBy: {
        id: order
      }
    })
    return {
      users,
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  }

  async findOneById(id: string) {
    const user = await this.prismaService.client.user.findUnique({ where: { id } })
    return user
  }

  async findOne(payload: string) {
    const user = await await this.prismaService.client.user.findFirst({
      where: {
        OR: [{ email: payload }, { addressWallet: payload }, { indentifyNumber: payload }]
      }
    })
    return user
  }

  async findOneByAddressWallet(addressWallet: string) {
    const user = await this.prismaService.client.user.findUnique({ where: { addressWallet } })
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: string, _user: IUser) {
    const deletedBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
    await this.prismaService.client.user.update({ where: { id }, data: { deletedBy } })
    const user = await this.prismaService.client.user.delete({ where: { id } })
    return user
  }

  getABI() {
    const filePath = 'artifacts/contracts/ContractA.sol/ContractA.json'
    return readContract(filePath).abi
  }
}
