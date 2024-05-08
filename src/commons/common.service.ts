import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import * as crypto from 'crypto'
import { IUser } from '../users/interfaces/IUser.interface'
import { ContractAttributesService } from '../contract-attributes/contract-attributes.service'
import { RESPONSE_MESSAGES } from '../constants/responseMessage.constant'
import { ContractAttributeValuesService } from '../contract-attribute-values/contract-attribute-values.service'
import { IContractAttributeResponse, IDataContractAttribute } from '../interfaces/contract-attribute.interface'
import { CreateContractAttributeContractCommonDto } from './dto/create-contract-attribute.dto'
import { ContractsService } from 'src/contracts/contracts.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttribute } from '@prisma/client'

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => ContractsService)) private readonly contractService: ContractsService,
    @Inject(forwardRef(() => TemplateContractsService))
    @Inject(forwardRef(() => ContractAttributesService))
    private readonly contractAttributeService: ContractAttributesService,
    private readonly contractAttributeValueService: ContractAttributeValuesService
  ) {}

  async createContractAttributesForContract(
    createContractAttributeCommonDto: CreateContractAttributeContractCommonDto,
    user: IUser
  ) {
    const { contractId, contractAttributes } = createContractAttributeCommonDto
    const contractAttributeRecords: IContractAttributeResponse[] = []
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email, role: user.role }

    for (const contractAttribute of contractAttributes) {
      if (!Object.values(ETypeContractAttribute).includes(contractAttribute.type as ETypeContractAttribute)) {
        throw new BadRequestException(RESPONSE_MESSAGES.TYPE_CONTRACT_ATTRIBUTE_IS_NOT_VALID)
      }

      const data: IDataContractAttribute = {
        value: null,
        type: contractAttribute.type
      }

      if (contractId && !(await this.contractService.findOneById(contractId)))
        throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
      else data.contractId = contractId
      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE
      ) {
        data.value = contractAttribute.property
        const hasHeading = contractAttributeRecords.some(
          (record) =>
            record.type === ETypeContractAttribute.CONTRACT_HEADING_1 ||
            record.type === ETypeContractAttribute.CONTRACT_HEADING_2
        )

        if (!hasHeading) {
          throw new BadRequestException(
            `The content ${contractAttribute.property} cannot be found without a title. Please create a title before generating content!`
          )
        }

        const contractAttributeRecord = await this.contractAttributeService.create(data, user)
        const contractAttributeValueRecord = await this.contractAttributeValueService.create(
          {
            value: contractAttribute.value !== 'Empty' ? contractAttribute.value : '',
            contractAttributeId: contractAttributeRecord.id
          },
          user
        )
        const result: IContractAttributeResponse = {
          id: contractAttributeRecord.id,
          property: contractAttributeRecord.value,
          value: contractAttributeValueRecord.value,
          type: contractAttributeRecord.type,
          createdBy
        }

        contractAttributeRecords.push(result)
      } else {
        data.value = contractAttribute.value
        if (contractAttributes.filter((item) => item.value === contractAttribute.value).length > 1) {
          throw new BadRequestException(RESPONSE_MESSAGES.CONTRACT_ATTRIBUTE_DUPLICATE)
        }

        const contractAttributeRecord = await this.contractAttributeService.create(data, user)
        contractAttributeRecords.push(contractAttributeRecord)
      }
    }

    return contractAttributeRecords
  }

  convertToTypeContractAttributesResponse(contractAttributes: ContractAttribute[]): IContractAttributeResponse[] {
    const result: IContractAttributeResponse[] = []
    for (const contractArribute of contractAttributes) {
      if (
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractArribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        result.push({
          id: contractArribute.id,
          property: contractArribute.value,
          value: (contractArribute as any).ContractAttributeValue.value,
          type: contractArribute.type,
          createdBy: contractArribute.createdBy,
          updatedBy: contractArribute.updatedBy
        })
      } else {
        result.push({
          id: contractArribute.id,
          value: contractArribute.value,
          type: contractArribute.type,
          createdBy: contractArribute.createdBy,
          updatedBy: contractArribute.updatedBy
        })
      }
    }
    return result
  }

  uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    )
  }
}
