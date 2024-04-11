import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInvitationDto } from './dto/create-invitation.dto'
import { UpdateInvitationDto } from './dto/update-invitation.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Injectable()
export class InvitationsService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}

  async create(createInvitationDto: CreateInvitationDto, _user: IUser) {
    const user = await this.prismaService.client.user.findUnique({ where: { email: createInvitationDto.email } })
    if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
    const invitation = await this.prismaService.client.invitation.create({
      data: { ...createInvitationDto, updatedAt: null, createdBy }
    })
    return invitation
  }

  findAll() {
    return `This action returns all invitations`
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`
  }
}
