import { Contract } from '@prisma/client'
import { IContractAttributeResponse } from './contract-attribute.interface'
import { EStageStatus, EVoting } from 'src/constants/enum.constant'

export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}

export interface IStage {
  id: string
  percent: number
  requestBy: string
  requestTo: string
  description?: string
  status: EStageStatus
  createdAt: Date
  deliveryAt: Date
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
