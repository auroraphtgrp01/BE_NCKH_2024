import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef
} from '@nestjs/common'
import { CreateParticipantDto, InvitationDto, SendInvitationsDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { ContractsService } from 'src/contracts/contracts.service'
import { UsersService } from 'src/users/users.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { IExecutor } from 'src/interfaces/executor.interface'
import { ConfigService } from '@nestjs/config'
import { Participant, ParticipantStatus, contractStatus } from '@prisma/client'
import { Exact } from '@prisma/client/runtime/library'
import { IQueuePayloadSendInvitation, QueueRedisService } from 'src/queues/queue-redis.service'

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => ContractsService)) private readonly contractService: ContractsService,
    private readonly userService: UsersService,
    private queueService: QueueRedisService
  ) {}
  async create(createParticipantDto: CreateParticipantDto, user: IUser) {
    if (!(await this.contractService.findOneById(createParticipantDto.contractId)))
      throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
    const { contractId, permission, email } = createParticipantDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const participantRecord = await this.prismaService.client.participant.create({
      data: {
        email,
        permission,
        Contract: { connect: { id: contractId } },
        updatedAt: null,
        createdBy
      }
    })

    return participantRecord
  }

  async sendInvitation(sendInvitationDto: SendInvitationsDto, user: IUser) {
    const invitations: InvitationDto[] = sendInvitationDto.invitation.filter(
      (invitation) => invitation.email !== user.email
    )
    const participants: Participant[] = []
    invitations.map(async (invitation: InvitationDto) => {
      const participantRecord = await this.create({ ...invitation, contractId: sendInvitationDto.contractId }, user)
      participants.push(participantRecord)
      const payload: IQueuePayloadSendInvitation = {
        to: invitation.email,
        from: user.email,
        messages: invitation.messages,
        link: `${this.configService.get<string>('FRONTEND_HOST')}/contract/${sendInvitationDto.contractId}/invitation`,
        receiver: user.name,
        addressWalletSender: user.addressWallet,
        contractName: sendInvitationDto.contractName,
        idParticipant: participantRecord.id
      }

      this.queueService.enqueueSendInvitation(payload)
    })

    return participants
  }

  findAll() {
    return `This action returns all participants`
  }

  async findOne(email: string, contractId: string) {
    const participant = await this.prismaService.client.participant.findFirst({
      where: { email, contractId }
    })
    return participant
  }

  async findAllByContractId(contractId: string) {
    const participants = await this.prismaService.client.participant.findMany({ where: { contractId } })
    return participants
  }

  async findOneById(id: string) {
    const participant = await this.prismaService.client.participant.findUnique({ where: { id } })
    return participant
  }

  async update(updateParticipantDto: UpdateParticipantDto, user: IUser) {
    const { id } = updateParticipantDto
    const find = await this.findOneById(id)

    if (!find) throw new NotFoundException(RESPONSE_MESSAGES.PARTICIPANT_NOT_FOUND)

    if (find.email !== user.email)
      throw new BadRequestException(RESPONSE_MESSAGES.USER_EMAIL_AND_INVITED_EMAIL_DO_NOT_MATCH)
    if (find.status !== ParticipantStatus.PENDING)
      throw new UnauthorizedException(RESPONSE_MESSAGES.PARTICIPANT_RESPONDED)
    if (
      updateParticipantDto.status &&
      !Object.values(ParticipantStatus).includes(updateParticipantDto.status as ParticipantStatus)
    )
      throw new BadRequestException(RESPONSE_MESSAGES.PARTICIPANT_STATUS_INVALID)

    const participant = await this.prismaService.client.participant.update({
      where: { id },
      data: {
        ...updateParticipantDto,
        User: updateParticipantDto.status ? { connect: { id: user.id } } : undefined,
        status: updateParticipantDto.status
          ? (updateParticipantDto.status as Exact<ParticipantStatus, ParticipantStatus>)
          : find.status,
        updatedBy: { id: user.id, name: user.name, email: user.email }
      }
    })

    if (updateParticipantDto.status) {
      const participants = await this.findAllByContractId(find.contractId)
      if (participants.filter((item) => item.status !== ParticipantStatus.ACCEPTED).length === 0) {
        await this.contractService.update({ id: participant.contractId, status: contractStatus.PARTICIPATED }, user)
      }
    }

    return participant
  }

  remove(id: number) {
    return `This action removes a #${id} participant`
  }
}
