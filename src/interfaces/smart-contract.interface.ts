export interface IKeyValueDeploy {
  keys: string[]
  values: string[]
}

export interface IValueSmartContract {
  contract: object
  contractAttributes: any[]
}

export interface IKeyValue {
  keys: string[]
  values: IValueSmartContract
}

export interface IStage {
  percent: number
  deliveryAt: Date
}

export interface IStageDeploy {
  percent: number
  deliveryAt: number
}
