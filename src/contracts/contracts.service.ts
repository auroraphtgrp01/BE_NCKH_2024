import { Inject, Injectable } from '@nestjs/common'
import { CreateContractDto } from './dto/create-contract.dto'
import { UpdateContractDto } from './dto/update-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { contractStatus } from '@prisma/client'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { InvitationsService } from 'src/invitations/invitations.service'

@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private invitationService: InvitationsService
  ) {}

  async createEmptyContract() {
    const contract = await this.prismaService.client.contract.create({
      data: {
        contractAddress: '',
        blockAddress: '',
        status: contractStatus.PENDING,
        gasPrice: '',
        startDate: new Date(),
        agreement: ''
      }
    })

    return contract
  }

  create(createContractDto: CreateContractDto) {
    return 'This action adds a new contract'
  }

  findAll() {
    return `This action returns all contracts`
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }

  async sendInvitation(sendInvitationDto: CreateInvitationDto) {
    // const party = await this.prismaService.client.party.findUnique({ where: { id: sendInvitationDto.idPartySender } })
    // if (!party) throw new NotFoundException({ message: RESPONSE_MESSAGES.PARTY_NOT_FOUND })
    const invitation = await this.invitationService.create(sendInvitationDto)

    // send email
    return {
      message: 'Invitation sent successfully',
      invitation
    }
  }
}
