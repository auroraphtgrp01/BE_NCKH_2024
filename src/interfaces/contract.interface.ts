import { Contract } from '@prisma/client'

export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}

export interface IContractAttributeValueResponse {
  id: string
  value: string
}

export interface IContractResponse {
  contract: Contract
  contractAttributeValues?: IContractAttributeValueResponse[]
}
