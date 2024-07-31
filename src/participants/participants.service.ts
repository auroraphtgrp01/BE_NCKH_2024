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
import { ERoleParticipant, EStageStatus } from 'src/constants/enum.constant'
import { CommonService } from 'src/commons/common.service'
import { map } from 'rxjs'

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => ContractsService)) private readonly contractService: ContractsService,
    private queueService: QueueRedisService,
    private commonService: CommonService
  ) {}
  async create(createParticipantDto: CreateParticipantDto, user: IUser) {
    const { contractId, permission, email, userId, status } = createParticipantDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }
    const participantRecord = await this.prismaService.client.participant.create({
      data: {
        email,
        permission,
        Contract: { connect: { id: contractId } },
        User: userId ? { connect: { id: userId } } : undefined,
        status,
        updatedAt: null,
        createdBy
      }
    })

    return participantRecord
  }

  async sendInvitation(sendInvitationDto: SendInvitationsDto, user: IUser) {
    const participants: Participant[] = []
    const findParticipants = await this.prismaService.client.participant.findMany({
      where: { contractId: sendInvitationDto.contractId }
    })

    const hasSender = findParticipants.find((item: any) => {
      item.permission.ROLES === ERoleParticipant.SENDER
    })

    const invitationSender = sendInvitationDto.invitation.find((item: any) => item.permission.ROLES === 'SENDER')
    if (hasSender && invitationSender) throw new BadRequestException({ message: RESPONSE_MESSAGES.SENDER_IS_EXIST })
    sendInvitationDto.invitation.map(async (invitation: InvitationDto) => {
      const participantRecord = await this.create({ ...invitation, contractId: sendInvitationDto.contractId }, user)
      participants.push(participantRecord)
      const payload: IQueuePayloadSendInvitation = {
        to: invitation.email,
        from: user.email,
        messages: invitation.messages,
        link: `${this.configService.get<string>('FRONTEND_HOST')}/contract/${sendInvitationDto.contractId}/invitation`,
        receiver: user.name,
        addressWalletSender: user.addressWallet,
        contractName: sendInvitationDto.contractName ? sendInvitationDto.contractName : '',
        idParticipant: participantRecord.id
      }

      this.queueService.enqueueSendInvitation(payload)
    })

    return participants
  }

  async findAllByUserId(userId: string) {
    const participants = await this.prismaService.client.participant.findMany({
      where: { userId },
      include: { User: true }
    })
    return participants
  }

  async findOne(email: string, contractId: string) {
    const participant = await this.prismaService.client.participant.findFirst({
      where: { email, contractId }
    })

    return participant
  }

  async findAllByContractId(contractId: string, user?: IUser) {
    const participants = await this.prismaService.client.participant.findMany({
      where: { contractId },
      include: { User: true }
    })

    return participants
  }

  async findOneById(id: string) {
    const participant = await this.prismaService.client.participant.findUnique({
      where: { id },
      include: { User: true }
    })
    return participant
  }

  async update(updateParticipantDto: UpdateParticipantDto, user: IUser) {
    const { id, userId, vote, individual, ...rest } = updateParticipantDto
    console.log('individual', individual)

    const find =
      id && !userId
        ? await this.findOneById(id)
        : await this.prismaService.client.participant.findFirst({ where: { userId }, include: { User: true } })
    if (!find) throw new NotFoundException(RESPONSE_MESSAGES.PARTICIPANT_NOT_FOUND)

    const participant = await this.prismaService.client.participant.update({
      where: { id },
      data: {
        ...rest,
        vote: vote ? vote : find.vote,
        User:
          updateParticipantDto.status === ParticipantStatus.ACCEPTED && find.status === ParticipantStatus.PENDING
            ? { connect: { id: user.id } }
            : undefined,
        status: updateParticipantDto.status
          ? (updateParticipantDto.status as Exact<ParticipantStatus, ParticipantStatus>)
          : find.status,
        updatedBy: { id: user.id, name: user.name, email: user.email }
      }
    })
    let isVotedAll
    if (vote) {
      const arbitrations = (
        await this.prismaService.client.participant.findMany({
          where: { contractId: find.contractId }
        })
      ).filter((item: any) => ERoleParticipant[item.permission.ROLES] === ERoleParticipant.ARBITRATION)
      isVotedAll = this.calculateVoteRatio(arbitrations, individual)
      if (isVotedAll.result)
        await this.contractService.update(
          { id: find.contractId, status: contractStatus.VOTED, winnerAddressWallet: isVotedAll.addressWallet },
          user
        )
    }

    if (updateParticipantDto.status) {
      const participants = await this.findAllByContractId(find.contractId, user)
      if (
        updateParticipantDto.status === ParticipantStatus.ACCEPTED &&
        participants.filter((item) => item.status !== ParticipantStatus.ACCEPTED).length === 0
      )
        await this.contractService.update({ id: participant.contractId, status: contractStatus.PARTICIPATED }, user)
      else if (
        updateParticipantDto.status === ParticipantStatus.SIGNED &&
        participants.filter((item) => item.status !== ParticipantStatus.SIGNED).length === 0
      )
        await this.contractService.update({ id: participant.contractId, status: contractStatus.SIGNED }, user)
    }

    const status = (await this.contractService.findOneById(participant.contractId)).status

    return { participant, contractStatus: status, isVotedAll }
  }

  remove(id: number) {
    return `This action removes a #${id} participant`
  }

  calculateVoteRatio(votes: any[], individual: any) {
    if (!votes || !individual) return { result: false }

    const countVotes = (voteType: 'A' | 'B' | null): number => votes.filter((item) => item.vote === voteType).length

    const countA = countVotes('A')
    const countB = countVotes('B')
    const countUnd = countVotes(null)

    if (countA !== countB && countUnd === 0) {
      const personWinner = countA > countB ? 'Customer' : 'Supplier'
      const addressWallet = countA > countB ? individual.sender : individual.receiver

      return {
        result: true,
        personWinner,
        addressWallet
      }
    }

    return { result: false }
  }
}
