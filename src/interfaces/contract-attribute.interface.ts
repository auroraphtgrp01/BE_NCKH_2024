import { IExecutor } from './executor.interface'

export interface ICreateContractAttributeRecord {
  value: string
  type: string
  property?: string
  Contract?: any
  TemplateContract?: any
}

export interface IContractAttribute {
  id: string
  property?: string
  value: string
  type: string
  createdBy: any
  updatedBy?: any
  index?: string
  descriptionOfStage?: string
}

export interface IDataContractAttribute {
  id?: string
  value: string
  type: string
  property?: string
  contractId?: string
  index?: number
  contractAttributeId?: string
}
