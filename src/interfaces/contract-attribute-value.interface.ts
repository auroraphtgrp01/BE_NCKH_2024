import { IExecutor } from './executor.interface'

export interface ICreateContractAttributeValue {
  value: string
  description?: string
  createdBy: IExecutor
  ContractAttribute: any
  Contract?: any
  TemplateContract?: any
}
