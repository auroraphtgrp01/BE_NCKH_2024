import { IExecutor } from './executor.interface'

export interface ICreateContractAttribute {
  name: string
  idArea: string
  type: string
  Contract?: any
  TemplateContract?: any
  createdBy: IExecutor
}

export interface IContractAttributeResponse {
  property: string
  value: {
    id: string
    idArea: string
    valueAttribute: string
    type: string
  }
  isCreated: boolean
}
