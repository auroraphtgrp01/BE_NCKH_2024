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
import { UsersService } from 'src/users/users.service'

@Injectable()
export class InvitationsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private queueService: QueueRedisService,
    private usersService: UsersService
  ) {}

  async create(createInvitationDto: CreateInvitationDto, _user: IUser) {
    const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
    const invitationRecord = await this.prismaService.client.invitation.create({
      data: {
        ...createInvitationDto,
        from: _user.email,
        link: 'https://send-mail/123354',
        receiver: _user.name,
        updatedAt: null,
        createdBy
      }
    })

    return invitationRecord
  }

  async testError() {
    throw new NotFoundException({ message: 'Test error' })
  }

  async sendInvitation(createInvitationDto: CreateInvitationDto[], _user: IUser) {
    this.testError()
    createInvitationDto.map(async (invitation: CreateInvitationDto) => {
      const user = await this.usersService.findOne(invitation.addressWalletSender)
      if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
      if (!(await this.usersService.findOne(invitation.to)))
        throw new NotFoundException({ message: `Email ${invitation.to} did not have an account` })

      const invitationRecord = await this.create(invitation, _user)

      const { to, from, messages, link, receiver, addressWalletSender, contractName, id } = invitationRecord
      const payload: IQueuePayloadSendInvitation = {
        to,
        from,
        messages,
        link,
        receiver,
        addressWalletSender,
        contractName,
        idInvitation: id
      }
      console.log(payload)

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
