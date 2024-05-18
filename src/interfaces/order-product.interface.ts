export interface IOrderProduct {
  id: string
  name: string
  image?: string
  quantity: number
  price: number
  description?: string
  discount?: number
  taxPrice: number
}
