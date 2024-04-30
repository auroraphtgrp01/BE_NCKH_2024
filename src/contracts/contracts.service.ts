import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateContractDto, CreateEmptyContractDto } from './dto/create-contract.dto'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { CustomPrismaService } from 'nestjs-prisma'
import { ContractAttribute, contractStatus } from '@prisma/client'
import { InvitationsService } from 'src/invitations/invitations.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CommonService } from 'src/commons/common.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { UsersService } from 'src/users/users.service'
import { Exact } from '@prisma/client/runtime/library'
import { ICreateContractResponse } from 'src/interfaces/contract.interface'
import { IDataContractAttribute } from 'src/interfaces/contract-attribute.interface'
import { TypeContractAttribute } from 'src/constants/enum.constant'
@Injectable()
export class ContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly invitationService: InvitationsService,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService,
    private readonly templateContractsService: TemplateContractsService,
    private readonly usersService: UsersService
  ) {}

  async createEmptyContract(contractData: CreateEmptyContractDto, user: IUser) {
    const { addressWallet, name, id } = contractData
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const contract = await this.prismaService.client.contract.create({
      data: {
        id,
        addressWallet,
        contractTitle: name,
        status: contractStatus.PENDING as Exact<contractStatus, contractStatus>,
        createdBy,
        updatedAt: null
      }
    })

    return contract
  }

  async create(createContractDto: CreateContractDto, user: IUser) {
    const contractResponse: ICreateContractResponse = { contract: null, contractAttributes: [] }
    const { invitation, template, ...contractData } = createContractDto
    if (!(await this.usersService.findOne(contractData.addressWallet)))
      throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    let contractAttributes: any[] = []

    const [contractRecord] = await Promise.all([
      this.createEmptyContract(contractData, user),
      this.invitationService.sendInvitation({ invitation, contractName: contractData.name }, user)
    ])
    contractResponse.contract = contractRecord

    if (template) {
      if (!(await this.templateContractsService.findOneById(template.id)))
        throw new NotFoundException({ message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND })
      contractAttributes = await this.prismaService.client.contractAttribute
        .findMany({
          where: {
            templateContractId: template.id
          }
        })
        .then((contractAttributes) => {
          const newContractAttributes: any[] = []
          contractAttributes.forEach((contractAttribute) => {
            if (
              contractAttribute.type === TypeContractAttribute.CONTRACT_ATTRIBUTE ||
              contractAttribute.type === TypeContractAttribute.CONTRACT_SIGNATURE
            )
              newContractAttributes.push({
                property: contractAttribute.value,
                value: 'Empty',
                type: contractAttribute.type
              })
            else
              newContractAttributes.push({
                value: contractAttribute.value,
                type: contractAttribute.type
              })
          })
          return newContractAttributes
        })

      const [contractAttributeRecords] = await Promise.all([
        this.commonService.createContractAttributes({ contractAttributes, contractId: contractRecord.id }, user)
      ])
      contractResponse.contractAttributes = contractAttributeRecords
    }
    return contractResponse
  }

  findAll() {
    return `This action returns all contracts`
  }

  async findOneById(id: string) {
    const contract = await this.prismaService.client.contract.findUnique({ where: { id } })
    return contract
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

    // if (contractData.id) {
    //   console.log('contractData', contractData)
    //   if (!(await this.commonService.findOneContractById(contractData.id)))
    //     throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

    //   const countContractAttributes = await this.prismaService.client.contractAttribute.count({
    //     where: { contractId: contractData.id }
    //   })
    //   console.log('countContractAttributes', countContractAttributes)

    //   if (countContractAttributes > 0) {
    //     const { contractAttributes } = another
    //     console.log('contractAttributes', contractAttributes)

    //     if (!contractAttributes || contractAttributes.length !== countContractAttributes)
    //       throw new UnauthorizedException({ message: RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_VALUES_IS_NOT_PROVIDED })
    //     const contractAttributeTypeAtbs = contractAttributes.filter(
    //       (contractAttribute) => contractAttribute.type === TypeContractAttribute.CONTRACT_ATTRIBUTE
    //     )
    //     console.log('contractAttributeTypeAtbs', contractAttributeTypeAtbs)

    //     await Promise.all(
    //       contractAttributeTypeAtbs.map(async (contractAttribute) => {
    //         console.log('Tạo contractAtributeValue')

    //         await this.contractAttributeValueService.create(
    //           { value: contractAttribute.valueAttribute, contractAttributeId: contractAttribute.id },
    //           user
    //         )
    //       })
    //     )
    //   }
    //   // Gọi thực thi deploy contract tại đây
    //   // ...
    //   const gasPrices: IGasPrice[] = [
    //     {
    //       addressWallet: '0x883654B80DaB3d9dA1C6E48cEF8046a148dB0Db1',
    //       price: '2001',
    //       reason: 'DEPLOY CONTRACT',
    //       createdAt: new Date()
    //     }
    //   ]
    //   const dataUpdate: UpdateContractDto = {
    //     ...contractData,
    //     status: contractStatus.DEPLOYED,
    //     gasPrices,
    //     contractAddress: '0xF40Ef444B65bB9a45e144fC6Ab480E873434Bb8a',
    //     blockAddress: '0xd0cab3b7c79f849a9360b470729a584c7fb660f9ab26691efd57c364ad7542f6'
    //   }
    //   contractResponse.contract = await this.update(dataUpdate, user)
  }

  remove(id: number) {
    return `This action removes a #${id} contract`
  }
}
