import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { readContract } from 'src/utils/readContract.utils'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto'
import { hashPassword } from 'src/utils/hashPassword'

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createUserDto: CreateUserDto) {
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
    return await this.prismaService.client.user.create({
      data: {
        ...createUserDto
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

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async findOneByAddressWallet(addressWallet: string) {
    const user = await this.prismaService.client.user.findUnique({ where: { addressWallet } })

    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  getABI() {
    const filePath = 'artifacts/contracts/ContractA.sol/ContractA.json'
    return readContract(filePath).abi
  }
}
