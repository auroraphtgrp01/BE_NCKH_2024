import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { Prisma, PrismaClient, contractStatus } from '@prisma/client'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { InvitationsService } from 'src/invitations/invitations.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IParty } from 'src/interfaces/contract.interface'

@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private invitationService: InvitationsService
  ) {}

  async create(contractData: CreateContractDto, templateId?: string) {
    if (!contractData.id) {
      const contract = await this.prismaService.client.contract.create({
        data: {
          contractTitle: '',
          addressWallet: '',
          contractAddress: '',
          blockAddress: '',
          status: contractStatus.PENDING,
          startDate: new Date()
        }
      })
      if (templateId) {
        const contractAttributeValues = await this.prismaService.client.contractAttributeValue.findMany({
          where: { contractId: templateId }
        })

        await Promise.all(
          contractAttributeValues.map((contractAttributeValue) => {
            this.prismaService.client.contractAttributeValue.create({
              data: {
                contractId: contract.id,
                contractAttributeId: contractAttributeValue.contractAttributeId,
                value: null
              }
            })
          })
        )
      }

      return contract
    } else {
      if (!(await this.findOne(contractData.id)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
      const contract = await this.update(contractData)
      return contract
    }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async findOne(id: string) {
    const contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    return contract
  }

  async update(updateContractDto: UpdateContractDto) {
    const { id, ...rest } = updateContractDto
    const _contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    const parties = updateContractDto.parties.map((party) => ({ ...party }))
    const gasPrices = updateContractDto.gasPrices.map((gasPrice) => ({ ...gasPrice }))
    const contract = await this.prismaService.client.contract.update({
      where: { id: updateContractDto.id },
      data: {
        ...rest,
        parties: { set: [..._contract.parties, parties] },
        gasPrices: { set: [..._contract.gasPrices, gasPrices] }
      }
    })
    return contract
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
