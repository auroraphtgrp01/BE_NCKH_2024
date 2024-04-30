import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInvitationDto, InvitationDto, SendInvitationsDto } from './dto/create-invitation.dto'
import { UpdateInvitationDto } from './dto/update-invitation.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from 'src/users/interfaces/IUser.interface'
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
    const { email, ...rest } = createInvitationDto
    const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
    const invitationRecord = await this.prismaService.client.invitation.create({
      data: {
        ...rest,
        to: email,
        addressWalletSender: _user.addressWallet,
        from: _user.email,
        link: 'https://send-mail/123354',
        receiver: _user.name,
        updatedAt: null,
        createdBy
      }
    })

    return invitationRecord
  }

  async sendInvitation(createInvitationDto: SendInvitationsDto, _user: IUser) {
    const invitations: InvitationDto[] = createInvitationDto.invitation.filter(
      (invitation) => invitation.email !== _user.email
    )
    invitations.map(async (invitation: InvitationDto) => {
      if (!(await this.usersService.findOne(invitation.email)))
        throw new NotFoundException({ message: `User with email ${invitation.email} does not exists` })

      const invitationRecord = await this.create(
        { ...invitation, contractName: createInvitationDto.contractName },
        _user
      )

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
