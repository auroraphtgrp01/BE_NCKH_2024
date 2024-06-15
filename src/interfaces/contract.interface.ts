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
  percent: number
  requestBy: string
  requestTo: string
  descriptionOfStage?: string
  status: EStageStatus
  createdAt: Date
  contractAttributeId?: string
}

export interface IStageData {
  percent?: number
  descriptionOfStage?: string
  status?: EStageStatus
  stageHandleStatus?: EStageHandleStatus
  contractAttributeId?: string
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
