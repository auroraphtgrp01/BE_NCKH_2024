import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInvitationDto } from './dto/create-invitation.dto'
import { UpdateInvitationDto } from './dto/update-invitation.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { MailPayload } from 'src/mailer/mail-payload.i'
import { MailService } from 'src/mailer/mailer.service'
import { QueueRedisModule } from 'src/queues/queue-redis.module'
import { IQueuePayloadSendInvitation, QueueRedisService } from 'src/queues/queue-redis.service'

@Injectable()
export class InvitationsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private queueService: QueueRedisService
  ) { }

  // async create(createInvitationDto: CreateInvitationDto, _user: IUser) {
  //   const user = await this.prismaService.client.user.findUnique({ where: { id: createInvitationDto.idUserSender } })
  //   if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
  //   const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
  //   const invitation = await this.prismaService.client.invitation.create({
  //     data: { ...createInvitationDto, updatedAt: null, createdBy }
  //   })
  // }

  async create(createInvitationDto: CreateInvitationDto[], _user: IUser) {
    createInvitationDto.map(async (invitation: CreateInvitationDto) => {
      const user = await this.prismaService.client.user.findUnique({ where: { id: invitation.idUserSender } })
      if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
      const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
      const invitationRecord = await this.prismaService.client.invitation.create({
        data: { ...invitation, updatedAt: null, createdBy }
      })
      const payload: IQueuePayloadSendInvitation = {
        to: invitation.email,
        from: _user.email,
        messages: invitation.message,
        link: 'O day se la duong dan den contract',
        receiver: invitation.email,
        addressWalletSender: '0x1234567890',
        contractName: 'Contract Name',
        idInvitation: invitationRecord.id
      }
      this.queueService.enqueueSendInvitation(payload)
    })
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
