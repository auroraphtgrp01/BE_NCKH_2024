import { IExecutor } from './executor.interface'

export interface ICreateContractAttributeRecord {
  value: string
  type: string
  Contract?: any
  TemplateContract?: any
}

export interface IContractAttributeResponse {
  id: string
  property?: string
  value: string
  type: string
  isCreated: boolean
  createdBy: IExecutor
  updatedBy?: IExecutor
}

export interface IDataContractAttribute {
  value: string
  type: string
  contractId?: string
  templateContractId?: string
}
