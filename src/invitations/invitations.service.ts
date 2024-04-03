import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInvitationDto } from './dto/create-invitation.dto'
import { UpdateInvitationDto } from './dto/update-invitation.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Injectable()
export class InvitationsService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}

  async create(createInvitationDto: CreateInvitationDto) {
    const user = await this.prismaService.client.user.findUnique({ where: { email: createInvitationDto.email } })
    if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    const invitation = await this.prismaService.client.invitation.create({
      data: { ...createInvitationDto }
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
