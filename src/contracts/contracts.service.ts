import { HttpException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { AnotherDto, CreateContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { ContractAttribute, ContractAttributeValue, contractStatus } from '@prisma/client'
import { InvitationsService } from 'src/invitations/invitations.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'
import { CommonService } from 'src/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { MailService } from 'src/mailer/mailer.service'
import { MailPayload } from 'src/mailer/mail-payload.i'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact, Omit } from '@prisma/client/runtime/library'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { IContractResponse, IGasPrice } from 'src/interfaces/contract.interface'
import { IContractAttributeResponse, ICreateContractAttribute } from 'src/interfaces/contract-attribute.interface'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { TypeContractAttributeValue } from 'src/constants/enum.constant'
import { isBuffer } from 'util'

@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private invitationService: InvitationsService,
    private commonService: CommonService,
    private templateContractsService: TemplateContractsService,
    private usersService: UsersService,
    private contractAttributeService: ContractAttributesService,
    private contractAttributeValueService: ContractAttributeValuesService
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

  async create(contractData: CreateContractDto, user: IUser, another: AnotherDto, templateId?: string) {
    const contractResponse: IContractResponse = { contract: null }
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException(RESPONSE_MESSAGES.USER_NOT_FOUND)
    if (contractData.id) {
      console.log('contractData', contractData)
      if (!(await this.commonService.findOneContractById(contractData.id)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

      const countContractAttributes = await this.prismaService.client.contractAttribute.count({
        where: { contractId: contractData.id }
      })
      console.log('countContractAttributes', countContractAttributes)

      if (countContractAttributes > 0) {
        const { contractAttributes } = another
        console.log('contractAttributes', contractAttributes)

        if (!contractAttributes || contractAttributes.length !== countContractAttributes)
          throw new UnauthorizedException({ message: RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_VALUES_IS_NOT_PROVIDED })
        const contractAttributeTypeAtbs = contractAttributes.filter(
          (contractAttribute) => contractAttribute.type === TypeContractAttributeValue.CONTRACT_ATTRIBUTE
        )
        console.log('contractAttributeTypeAtbs', contractAttributeTypeAtbs)

        await Promise.all(
          contractAttributeTypeAtbs.map(async (contractAttribute) => {
            console.log('Tạo contractAtributeValue')

            await this.contractAttributeValueService.create(
              { value: contractAttribute.valueAttribute, contractAttributeId: contractAttribute.id },
              user
            )
          })
        )
      }
      // Gọi thực thi deploy contract tại đây
      // ...
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
      contractResponse.contract = await this.update(dataUpdate, user)
    } else {
      let findContractAttributes: ContractAttribute[] = []
      if (templateId) {
        if (!(await this.templateContractsService.findOneById(templateId)))
          throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
        findContractAttributes = await this.prismaService.client.contractAttribute.findMany({
          where: { templateContractId: templateId }
        })
      }

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

      if (findContractAttributes.length > 0) {
        contractResponse.contractAttributes = await Promise.all(
          findContractAttributes.map(async (contractAttribute) => {
            const payload: ICreateContractAttribute = {
              name: contractAttribute.name,
              idArea: contractAttribute.idArea,
              type: contractAttribute.type,
              createdBy
            }
            return await this.contractAttributeService.create(
              { ...payload, contractId: contractResponse.contract.id, isContractEmpty: true },
              user
            )
          })
        )
      }
    }
    return { ...contractResponse }
  }

  findAll() {
    return `This action returns all contracts`
  }

  async update(updateContractDto: UpdateContractDto, user: IUser) {
    const { id, ...rest } = updateContractDto
    const updatedBy: IExecutor = { id: user.id, name: user.name, email: user.email }
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
        gasPrices: { set: updatedGasPrices },
        updatedBy
      }
    })
    return contract
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }
}
