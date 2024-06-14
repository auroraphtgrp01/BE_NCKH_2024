import { Contract } from '@prisma/client'
import { IContractAttribute } from './contract-attribute.interface'
import { EStageStatus, EVoting } from 'src/constants/enum.constant'

export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}

export interface IStage {
  id?: string
  percent: number
  requestBy: string
  requestTo: string
  description?: string
  status: EStageStatus
  createdAt: Date
}

export interface IStageData {
  id?: string
  percent?: number
  description?: string
  status?: EStageStatus
  stageHandleStatus?: EStageHandleStatus
}
export enum EStageHandleStatus {
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete'
}

export interface IContractAttributeValueResponse {
  id: string
  value: string
}

export interface ICreateContractResponse {
  contract: Contract
  contractAttributes: IContractAttribute[]
}

export interface IContractResponse {
  readonly contracts: Contract[]
  readonly contractAttributes: IContractAttribute[]
}

export interface IVoting {
  userId: string
  contractId: string
  vote: EVoting
}
