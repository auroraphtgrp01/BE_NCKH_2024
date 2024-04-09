export interface IParty {
  partyName: string
  representativeName: string
  userId: string
  taxCode: string
  position: string
  email: string
  indentifyNumber: string
  phoneNumber: string
  address: string
}

export interface IGasPrice {
  addressWallet: string
  price: string
  reason: string
  createdAt: Date
}
