export interface IKeyValueSmartContract {
  keys: string[]
  values: string[]
}

export interface IStage {
  percent: number
  deliveryAt: Date
}

export interface IStageDeploy {
  percent: number
  deliveryAt: number
}
