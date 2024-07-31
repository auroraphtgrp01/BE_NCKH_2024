import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import { IContractAttribute } from '../interfaces/contract-attribute.interface'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import {
  ContractAttribute,
  ContractAttributeInBlockchain,
  ContractAttributeValue,
  ContractAttributeValueInBlockchain
} from '@prisma/client'

@Injectable()
export class CommonService {
  convertToTypeContractAttributesResponse(
    contractAttributes:
      | (ContractAttribute & { ContractAttributeValue: ContractAttributeValue })[]
      | (ContractAttributeInBlockchain & { ContractAttributeValueInBlockchain: ContractAttributeValueInBlockchain })[]
  ): IContractAttribute[] {
    const result: IContractAttribute[] = []
    for (const contractAttribute of contractAttributes) {
      if (
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractAttribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ) {
        result.push({
          id: contractAttribute.id,
          property: (contractAttribute as any)?.property
            ? (contractAttribute as any)?.property
            : contractAttribute.value,
          value: (contractAttribute as any)?.ContractAttributeValue
            ? (contractAttribute as any)?.ContractAttributeValue?.value
            : (contractAttribute as any)?.ContractAttributeInBlockchain?.value,
          type: contractAttribute.type,
          createdBy: contractAttribute.createdBy,
          updatedBy: contractAttribute.updatedBy,
          index: (contractAttribute as any)?.index
        })
      } else if (contractAttribute.type === ETypeContractAttribute.CONTRACT_PAYMENT_STAGE) {
        result.push({
          id: contractAttribute.id,
          property: (contractAttribute as any)?.property
            ? (contractAttribute as any)?.property
            : contractAttribute.value,
          value: (contractAttribute as any)?.ContractAttributeValue
            ? (contractAttribute as any)?.ContractAttributeValue?.value
            : (contractAttribute as any)?.ContractAttributeInBlockchain?.value,
          descriptionOfStage: (contractAttribute as any)?.ContractAttributeValue
            ? (contractAttribute as any)?.ContractAttributeValue?.descriptionOfStage
              ? (contractAttribute as any)?.ContractAttributeValue?.descriptionOfStage
              : ''
            : (contractAttribute as any)?.ContractAttributeInBlockchain?.descriptionOfStage
            ? (contractAttribute as any)?.ContractAttributeInBlockchain?.descriptionOfStage
            : '',
          type: contractAttribute.type,
          createdBy: contractAttribute.createdBy,
          updatedBy: contractAttribute.updatedBy,
          index: (contractAttribute as any)?.index
        })
      } else
        result.push({
          id: contractAttribute.id,
          value: contractAttribute.value,
          type: contractAttribute.type,
          createdBy: contractAttribute.createdBy,
          updatedBy: contractAttribute.updatedBy,
          index: (contractAttribute as any)?.index
        })
    }
    return result
  }

  uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    )
  }

  createRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}
