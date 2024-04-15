import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { contractStatus } from '@prisma/client'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { InvitationsService } from 'src/invitations/invitations.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ContractPartyInfosService } from 'src/contract-party-infos/contract-party-infos.service'
import { IContractAttributeValue } from 'src/interfaces/contract.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { CommonService } from 'src/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { PartyInfosService } from 'src/party-infos/party-infos.service'

@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private invitationService: InvitationsService,
    private contractPartyInfoService: ContractPartyInfosService,
    private contractAttributeValueService: ContractAttributeValuesService,
    private commonService: CommonService,
    private partyInfosService: PartyInfosService
  ) {}

  async createEmptyContract(contractData: CreateContractDto, user: IUser) {
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const contract = await this.prismaService.client.contract.create({
      data: {
        contractTitle: contractData.contractTitle ? contractData.contractTitle : '',
        addressWallet: contractData.addressWallet ? contractData.addressWallet : '',
        contractAddress: contractData.contractAddress ? contractData.contractAddress : '',
        blockAddress: contractData.blockAddress ? contractData.blockAddress : '',
        status: contractStatus.PENDING,
        startDate: new Date(),
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }

  async create(contractData: CreateContractDto, user: IUser, templateId?: string, partyInfoIds?: string[]) {
    if (contractData.id) {
      if (!(await this.commonService.findOneContractById(contractData.id)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
      if (!partyInfoIds || partyInfoIds.length < 2)
        throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PARTY_INFO_IS_NOT_PROVIDED })
      const handlePartyInfoIds = await Promise.all(
        partyInfoIds.map(async (partyInfoId) => await this.partyInfosService.findOneById(partyInfoId))
      )
      if (handlePartyInfoIds.includes(null))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.ONE_OF_THE_PARTY_INFO_IS_NOT_FOUND })

      const newPartyInfoIds: string[] = await Promise.all(
        partyInfoIds.map(async (partyInfoId) => {
          const newPartyInfoId = await this.contractPartyInfoService.create(
            { partyInfoId, contractId: contractData.id },
            user
          )
          return newPartyInfoId.id
        })
      )

      const contract = await this.update(contractData, newPartyInfoIds)

      return contract
    }
    const contract = await this.createEmptyContract(contractData, user)
    if (templateId) {
      if (!(await this.commonService.findOneContractById(templateId)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_TEMPLATE_IS_NOT_FOUND })
      const findcontractAttributeValues = await this.prismaService.client.contractAttributeValue.findMany({
        where: { contractId: templateId }
      })

      const contractAttributeValues: IContractAttributeValue[] = await Promise.all(
        findcontractAttributeValues.map(async (contractAttributeValue) => {
          const newContractAttributeValue = await this.contractAttributeValueService.create(
            {
              contractId: contract.id,
              contractAttributeId: contractAttributeValue.contractAttributeId,
              value: ''
            },
            user,
            true
          )
          return {
            id: newContractAttributeValue.id,
            value: newContractAttributeValue.value
          }
        })
      )

      return { contract, contractAttributeValues }
    }

    return contract
  }

  findAll() {
    return `This action returns all contracts`
  }

  async update(updateContractDto: UpdateContractDto, partyInfoIds?: string[]) {
    const { id, ...rest } = updateContractDto
    const isContractExist = await this.prismaService.client.contract.findUnique({ where: { id } })
    if (!isContractExist) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const gasPrice = await updateContractDto.gasPrices.map((gasPrice) => {
      return { ...gasPrice }
    })
    if (partyInfoIds && partyInfoIds.length < 2)
      throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PARTY_INFO_IS_NOT_PROVIDED })
    const contract = await this.prismaService.client.contract.update({
      where: { id: updateContractDto.id },
      data: {
        ...rest,
        gasPrices: { set: [...isContractExist.gasPrices, gasPrice] }
      }
    })
    return contract
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }

  async sendInvitation(sendInvitationDto: CreateInvitationDto, user: IUser) {
    // const party = await this.prismaService.client.party.findUnique({ where: { id: sendInvitationDto.idPartySender } })
    // if (!party) throw new NotFoundException({ message: RESPONSE_MESSAGES.PARTY_NOT_FOUND })
    const invitation = await this.invitationService.create(sendInvitationDto, user)

    // send email
    return {
      message: 'Invitation sent successfully',
      invitation
    }
  }
}
