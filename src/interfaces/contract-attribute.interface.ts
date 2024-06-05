import { IExecutor } from './executor.interface'

export interface ICreateContractAttributeRecord {
  value: string
  type: string
  property?: string
  Contract?: any
  TemplateContract?: any
}

export interface IContractAttributeResponse {
  id: string
  property?: string
  value: string
  type: string
  createdBy?: any
  updatedBy?: any
}

export interface IDataContractAttribute {
  id?: string
  value: string
  type: string
  property?: string
  contractId?: string
  index?: number
}
