import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import * as crypto from 'crypto'
import { IUser } from '../users/interfaces/IUser.interface'
import { ContractAttributesService } from '../contract-attributes/contract-attributes.service'
import { TypeContractAttribute } from '../constants/enum.constant'
import { RESPONSE_MESSAGES } from '../constants/responseMessage'
import { ContractAttributeValuesService } from '../contract-attribute-values/contract-attribute-values.service'
import {
  IContractAttributeResponse,
  ICreateContractAttributeRecord,
  IDataContractAttribute
} from '../interfaces/contract-attribute.interface'
import { CreateContractAttributeCommonDto } from './dto/create-contract-attribute.dto'
import { ContractsService } from 'src/contracts/contracts.service'
import { IExecutor } from 'src/interfaces/executor.interface'
import { TemplateContractsService } from 'src/template-contracts/template-contracts.service'

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => ContractsService)) private readonly contractService: ContractsService,
    @Inject(forwardRef(() => TemplateContractsService))
    private readonly templateContractService: TemplateContractsService,
    private readonly contractAttributeService: ContractAttributesService,
    private readonly contractAttributeValueService: ContractAttributeValuesService
  ) {}

  async createContractAttributes(createContractAttributeCommonDto: CreateContractAttributeCommonDto, user: IUser) {
    const { templateContractId, contractId, contractAttributes } = createContractAttributeCommonDto
    const contractAttributeRecords: IContractAttributeResponse[] = []
    const createdBy: IExecutor = null

    for (const contractAttribute of contractAttributes) {
      if (!Object.values(TypeContractAttribute).includes(contractAttribute.type as TypeContractAttribute)) {
        throw new BadRequestException(RESPONSE_MESSAGES.TYPE_CONTRACT_ATTRIBUTE_IS_NOT_VALID)
      }

      const data: IDataContractAttribute = {
        value: null,
        type: contractAttribute.type
      }

      if (contractId) {
        if (!(await this.contractService.findOneById(contractId))) {
          throw new NotFoundException(RESPONSE_MESSAGES.CONTRACT_NOT_FOUND)
        }
        data.contractId = contractId
      } else {
        if (!(await this.templateContractService.findOneById(templateContractId))) {
          throw new NotFoundException(RESPONSE_MESSAGES.TEMPLATE_CONTRACT_IS_NOT_FOUND)
        }
        data.templateContractId = templateContractId
      }

      if (
        contractAttribute.type === TypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === TypeContractAttribute.CONTRACT_SIGNATURE
      ) {
        data.value = contractAttribute.property
        const hasHeading = contractAttributeRecords.some(
          (record) =>
            record.type === TypeContractAttribute.CONTRACT_HEADING_1 ||
            record.type === TypeContractAttribute.CONTRACT_HEADING_2
        )

        if (!hasHeading) {
          throw new BadRequestException(
            `The content ${contractAttribute.property} cannot be found without a title. Please create a title before generating content!`
          )
        }

        const contractAttributeRecord = await this.contractAttributeService.create(data, user)
        const contractAttributeValueRecord = await this.contractAttributeValueService.create(
          {
            value: contractAttribute.value,
            contractAttributeId: contractAttributeRecord.id
          },
          user
        )

        const result: IContractAttributeResponse = {
          id: contractAttributeRecord.id,
          property: contractAttributeRecord.value,
          value: contractAttributeValueRecord.value,
          type: contractAttributeRecord.type,
          isCreated: true,
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

  uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    )
  }
}
