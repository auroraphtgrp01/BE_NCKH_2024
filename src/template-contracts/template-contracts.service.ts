import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ContractAttributesService } from 'src/contract-attributes/contract-attributes.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { UpdateContractAttributeDto } from 'src/contracts/dto/update-contract.dto'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttributeValuesService } from 'src/contract-attribute-values/contract-attribute-values.service'

@Injectable()
export class TemplateContractsService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(forwardRef(() => ContractAttributesService)) private contractAttributesService: ContractAttributesService,
    private contractAttributeValuesService: ContractAttributeValuesService
  ) {}
  async create(createTemplateContractDto: CreateTemplateContractDto, user: IUser) {
    const { name, contractAttributes } = createTemplateContractDto
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    const isExist = await Promise.all(
      contractAttributes.map(async (contractAttributeId) => {
        if (!(await this.contractAttributesService.findOneById(contractAttributeId))) return false
        return true
      })
    )
    if (isExist.includes(false))
      throw new NotFoundException(RESPONSE_MESSAGES.ONE_OF_THE_CONATRACT_ATTRIBUTES_DOES_NOT_EXIST)

    const templateContract = await this.prismaService.client.templateContract.create({
      data: {
        name,
        path: createTemplateContractDto.path
          ? createTemplateContractDto.path
          : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
        contractAttributes: contractAttributes,
        createdBy,
        updatedAt: null
      }
    })

    return { templateContract }
  }

  async findAll() {
    return await this.prismaService.client.templateContract.findMany()
  }

  async findOneById(id: string) {
    const templateContract = await this.prismaService.client.templateContract.findUnique({ where: { id } })
    const contractAttributes = await Promise.all(
      templateContract.contractAttributes.map(async (contractAttributeId: string) => {
        return await this.contractAttributesService.findOneById(contractAttributeId)
      })
    )
    return { templateContract, contractAttributes }
  }

  async getTemplateContractAttributes(templateId: string) {
    const contractAttributes = await this.contractAttributesService.findAllByTemplateId(templateId)
    return contractAttributes
  }

  async findFirst() {
    return await this.prismaService.client.templateContract.findFirst()
  }

  async update(updateContractAttribute: UpdateContractAttributeDto, user: IUser) {
    try {
      const contract = await this.prismaService.client.contract.findUnique({
        where: { id: updateContractAttribute.id }
      })
      if (!contract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

      Promise.all([
        updateContractAttribute.updatedAttributes.map(async (item) => {
          if (item.statusAttribute === 'Create') {
            if (
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
              item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
              item.type === ETypeContractAttribute.TOTAL_AMOUNT
            ) {
              const contractAttribute = await this.contractAttributesService.create(
                {
                  contractId: updateContractAttribute.id,
                  value: item.property,
                  type: item.type,
                  index: item.index
                },
                user
              )
              await this.contractAttributeValuesService.create(
                {
                  value: item.value.toString(),
                  descriptionOfStage: item.descriptionOfStage,
                  contractAttributeId: contractAttribute.id
                },
                user
              )
            } else {
              await this.contractAttributesService.create(
                {
                  contractId: updateContractAttribute.id,
                  value: item.value,
                  type: item.type,
                  index: item.index
                },
                user
              )
            }
          } else if (item.statusAttribute === 'Update') {
            if (
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
              item.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
              item.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
              item.type === ETypeContractAttribute.TOTAL_AMOUNT
            ) {
              const contractAttribute = await this.contractAttributesService.update(
                {
                  id: item.id,
                  value: item.property,
                  type: item.type,
                  index: item.index
                },
                user
              )
              await this.contractAttributeValuesService.update(
                {
                  value: item.value,
                  contractAttributeId: contractAttribute.id
                },
                user
              )
            } else {
              await this.contractAttributesService.update(
                {
                  id: item.id,
                  value: item.value,
                  type: item.type,
                  index: item.index
                },
                user
              )
            }
          }
        }),
        updateContractAttribute.deleteArray.map(async (item) => {
          await this.prismaService.client.contractAttributeValue.delete({ where: { contractAttributeId: item.id } })
          await this.prismaService.client.contractAttribute.delete({ where: { id: item.id } })
        })
      ])
    } catch (error) {
      throw error
    }

    return {
      message: RESPONSE_MESSAGES.UPDATE_CONTRACT_ATTRIBUTE_SUCCESS
    }
  }

  async remove(id: string, user: IUser) {
    try {
      const templateContract = await this.prismaService.client.templateContract.findUnique({ where: { id } })
      if (!templateContract) throw new NotFoundException(RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND)
      const deletedBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

      await Promise.all([
        templateContract.contractAttributes.map((contractAttributeId) => {
          this.contractAttributesService.remove(contractAttributeId, user)
        }),
        this.prismaService.client.templateContract.update({ where: { id }, data: { deletedBy } }),
        this.prismaService.client.templateContract.delete({ where: { id } })
      ])
      return { message: RESPONSE_MESSAGES.TEMPLATE_CONTRACT_DELETED_SUCCESSFULLY }
    } catch (error) {
      throw error
    }
  }
}
