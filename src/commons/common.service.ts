import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import { IContractAttributeResponse } from '../interfaces/contract-attribute.interface'
import { ETypeContractAttribute } from 'src/constants/enum.constant'
import { ContractAttribute, ContractAttributeInBlockchain, Prisma } from '@prisma/client'

type ContractAttributeWithValues = {
  [K in keyof ContractAttribute]: ContractAttribute[K] & { ContractAttributeValue: true }
}

type TContractAttribute = Prisma.ContractAttributeGetPayload<{
  include: {
    ContractAttributeValue: true
  }
}>

@Injectable()
export class CommonService {
  convertToTypeContractAttributesResponse(
    contractAttributes:
      | (ContractAttribute & { ContractAttributeValue: true })[]
      | (ContractAttributeInBlockchain & { ContractAttributeValueInBlockchain: true })[]
  ): IContractAttributeResponse[] {
    const result: IContractAttributeResponse[] = []

    for (const contractArribute of contractAttributes) {
      if (
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_SIGNATURE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        contractArribute.type === ETypeContractAttribute.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        contractArribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      )
        result.push({
          id: contractArribute.id,
          property: contractArribute.value,
          value: (contractArribute as any).ContractAttributeValue
            ? (contractArribute as any).ContractAttributeValue.value
            : (contractArribute as any).ContractAttributeValueInBlockchain.value,
          type: contractArribute.type,
          createdBy: (contractArribute as ContractAttribute).createdBy,
          updatedBy: (contractArribute as ContractAttribute).updatedBy
        })
      else {
        result.push({
          id: contractArribute.id,
          value: contractArribute.value,
          type: contractArribute.type,
          createdBy: (contractArribute as ContractAttribute).createdBy,
          updatedBy: (contractArribute as ContractAttribute).updatedBy
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

  createRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}
