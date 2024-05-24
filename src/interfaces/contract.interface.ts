import { Contract } from '@prisma/client'
import { IContractAttributeResponse } from './contract-attribute.interface'
import { EVoting } from 'src/constants/enum.constant'

export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}

export interface IStage {
  deliveryAt: Date
  percent: number
  description?: string
  userConfirm: boolean
  supplierConfirm: boolean
  isDone: boolean
}

export interface IContractAttributeValueResponse {
  id: string
  value: string
}

export interface ICreateContractResponse {
  contract: Contract
  contractAttributes: IContractAttributeResponse[]
}

export interface IContractResponse {
  readonly contracts: Contract[]
  readonly contractAttributes: IContractAttributeResponse[]
}

export interface IVoting {
  userId: string
  contractId: string
  vote: EVoting
}
