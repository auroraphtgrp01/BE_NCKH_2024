export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}

export interface IContractAttributeValueResponse {
  id: string
  value: string
}
