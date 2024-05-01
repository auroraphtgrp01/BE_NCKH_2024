import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ERoles } from 'src/constants/enum.constant'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { Roles } from '@prisma/client'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Injectable()
export class RolesService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createRoleDto: CreateRoleDto, user: IUser): Promise<Roles> {
    if (await this.findOneByName(createRoleDto.name))
      throw new BadRequestException({ message: RESPONSE_MESSAGES.ROLE_IS_EXIST })
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const role = await this.prismaService.client.roles.create({
      data: { ...createRoleDto, createdBy, updatedAt: null }
    })

    return role
  }

  findAll() {
    return `This action returns all roles`
  }

  async findOneByName(name: string) {
    const role = this.prismaService.client.roles.findUnique({ where: { name } })
    return role
  }

  async findOneById(id: string) {
    const role = this.prismaService.client.roles.findUnique({ where: { id } })
    return role
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
