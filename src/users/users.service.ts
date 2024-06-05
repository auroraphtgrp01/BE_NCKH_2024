import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { readContract } from 'src/utils/readContract.utils'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto'
import { hashPassword } from 'src/utils/hashPassword'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from './interfaces/IUser.interface'
import { Exact } from '@prisma/client/runtime/library'
import { Gender } from '@prisma/client'
import { isNumeric } from 'src/decorators/is-nummeric.decorator'
import { ERoles } from 'src/constants/enum.constant'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createUserDto: CreateUserDto, user?: IUser) {
    if (Object.values(ERoles).some((role) => role === createUserDto.role) == false)
      throw new NotFoundException(RESPONSE_MESSAGES.ROLE_IS_INVALID)
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
      throw new NotFoundException(RESPONSE_MESSAGES.USER_IS_EXIST)
    }

    let createdBy: IExecutor = null

    if (user) {
      createdBy = { id: user.id, name: user.name, email: user.email, role: user.role }
      if (!createUserDto.PIN) throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PIN_IS_REQUIRED })
      if (createUserDto.PIN.length !== 6) throw new UnauthorizedException(RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT)
      if (!isNumeric(createUserDto.PIN)) throw new UnauthorizedException(RESPONSE_MESSAGES.PIN_MUST_BE_A_NUMBER)
    }
    return await this.prismaService.client.user.create({
      data: {
        ...createUserDto,
        gender: createUserDto.gender as Exact<Gender, Gender>,
        PIN: createUserDto.PIN ? await hashPassword(createUserDto.PIN) : null,
        updatedAt: null,
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
    const user = await this.prismaService.client.user.findFirst({
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

  async update(updateUserDto: UpdateUserDto, _user: IUser) {
    const updatedBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email, role: _user.role }
    const user = await this.prismaService.client.user.update({
      where: { id: updateUserDto.id },
      data: {
        ...updateUserDto,
        gender: updateUserDto.gender as Exact<Gender, Gender>,
        updatedBy
      }
    })
    return user
  }

  async remove(id: string, _user: IUser) {
    const deletedBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email, role: _user.role }
    await this.prismaService.client.user.update({ where: { id }, data: { deletedBy } })
    const user = await this.prismaService.client.user.delete({ where: { id } })
    return user
  }

  getABI() {
    // const filePath = 'artifacts/contracts/ContractA.sol/ContractA.json'
    // return readContract(filePath).abi
  }
}
