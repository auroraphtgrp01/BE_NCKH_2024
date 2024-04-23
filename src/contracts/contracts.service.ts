import { HttpException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { AnotherDto, CreateContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { ContractAttributeValue, contractStatus } from '@prisma/client'
import { InvitationsService } from 'src/invitations/invitations.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ContractPartyInfosService } from 'src/contract-party-infos/contract-party-infos.service'
import { IContractAttributeValueResponse, IContractResponse, IGasPrice } from 'src/interfaces/contract.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { CommonService } from 'src/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { PartyInfosService } from 'src/party-infos/party-infos.service'
import { MailService } from 'src/mailer/mailer.service'
import { MailPayload } from 'src/mailer/mail-payload.i'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact, Omit } from '@prisma/client/runtime/library'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'

@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private invitationService: InvitationsService,
    private contractPartyInfoService: ContractPartyInfosService,
    private contractAttributeValueService: ContractAttributeValuesService,
    private commonService: CommonService,
    private partyInfosService: PartyInfosService,
    private templateContractsService: TemplateContractsService,
    private usersService: UsersService
  ) {}

  async createEmptyContract(contractData: Omit<CreateContractDto, 'gasPrices' | 'agreements'>, user: IUser) {
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const contract = await this.prismaService.client.contract.create({
      data: {
        ...contractData,
        status: contractStatus.PENDING as Exact<contractStatus, contractStatus>,
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }
  async testError() {
    throw new NotFoundException({ message: 'Test error' })
  }

  async create(
    contractData: CreateContractDto,
    user: IUser,
    another: AnotherDto,
    templateId?: string,
    partyInfoIds?: string[]
  ) {
    const contractResponse: IContractResponse = { contract: null }
    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException(RESPONSE_MESSAGES.USER_NOT_FOUND)
    if (contractData.id) {
      if (!(await this.commonService.findOneContractById(contractData.id)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
      if (!partyInfoIds || partyInfoIds.length < 2)
        throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PARTY_INFO_IS_NOT_PROVIDED })
      await Promise.all(
        partyInfoIds.map(async (partyInfoId) => {
          if (!(await this.partyInfosService.findOneById(partyInfoId)))
            throw new NotFoundException({ message: RESPONSE_MESSAGES.ONE_OF_THE_PARTY_INFO_IS_NOT_FOUND })

          const newPartyInfoId = await this.contractPartyInfoService.create(
            { partyInfoId, contractId: contractData.id },
            user
          )
          return newPartyInfoId.id
        })
      )

      const countContractAttributeValues = await this.prismaService.client.contractAttributeValue.count({
        where: { contractId: contractData.id }
      })

      if (countContractAttributeValues > 0) {
        const { contractAttributeValues } = another
        if (!contractAttributeValues || contractAttributeValues.length !== countContractAttributeValues)
          throw new UnauthorizedException({ message: RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_VALUES_IS_NOT_PROVIDED })

        contractResponse.contractAttributeValues = await Promise.all(
          contractAttributeValues.map(async (contractAttributeValue) => {
            if (!(await this.contractAttributeValueService.findOneById(contractAttributeValue.id)))
              throw new NotFoundException({ message: RESPONSE_MESSAGES.ONE_OF_THE_CONTRACT_ATTRIBUTE_IS_NOT_FOUND })
            const updateContractAttributeValue = await this.contractAttributeValueService.update(
              contractAttributeValue,
              user
            )
            return {
              id: updateContractAttributeValue.id,
              value: updateContractAttributeValue.value
            }
          })
        )
      }

      // Gọi thực thi deploy contract tại đây
      //...

      const gasPrices: IGasPrice[] = [
        {
          addressWallet: '0x883654B80DaB3d9dA1C6E48cEF8046a148dB0Db1',
          price: '2001',
          reason: 'DEPLOY CONTRACT',
          createdAt: new Date()
        }
      ]

      const dataUpdate: UpdateContractDto = {
        ...contractData,
        status: contractStatus.DEPLOYED,
        gasPrices,
        contractAddress: '0xF40Ef444B65bB9a45e144fC6Ab480E873434Bb8a',
        blockAddress: '0xd0cab3b7c79f849a9360b470729a584c7fb660f9ab26691efd57c364ad7542f6'
      }
      contractResponse.contract = await this.update(dataUpdate)
    } else {
      let findContractAttributeValues: ContractAttributeValue[] = []

      if (templateId) {
        if (!(await this.templateContractsService.findOneById(templateId)))
          throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
        findContractAttributeValues = await this.prismaService.client.contractAttributeValue.findMany({
          where: { templateContractId: templateId }
        })
      }
      // contractResponse.contract = await this.createEmptyContract(contractData, user)
      const invitations = another.invitations.filter((invitation) => invitation.to !== user.email)
      const invitationPayloads: CreateInvitationDto[] = []
      await invitations.map((invitation) => {
        invitationPayloads.push({
          ...invitation,
          contractName: contractData.contractTitle,
          addressWalletSender: user.addressWallet
        })
      })
      ;[, contractResponse.contract] = await Promise.all([
        this.invitationService.sendInvitation(invitationPayloads, user),
        this.createEmptyContract(contractData, user)
      ])

      if (findContractAttributeValues.length > 0) {
        contractResponse.contractAttributeValues = await Promise.all(
          findContractAttributeValues.map(async (contractAttributeValue) => {
            const newContractAttributeValue = await this.contractAttributeValueService.create(
              {
                contractId: contractResponse.contract.id,
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
      }
    }
    return { ...contractResponse }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async update(updateContractDto: UpdateContractDto) {
    const { id, ...rest } = updateContractDto
    const isContractExist = await this.prismaService.client.contract.findUnique({ where: { id } })
    if (!isContractExist) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })
    const gasPrice = await updateContractDto.gasPrices.map((gasPrice) => {
      return { ...gasPrice }
    })
    const updatedGasPrices = [...isContractExist.gasPrices, ...gasPrice]
    const contract = await this.prismaService.client.contract.update({
      where: { id: updateContractDto.id },
      data: {
        ...rest,
        gasPrices: { set: updatedGasPrices }
      }
    })
    return contract
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }
}
