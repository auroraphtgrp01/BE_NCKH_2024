import { ERoles } from 'src/constants/enum.constant'

export interface IUser {
  id: string
  name: string
  addressWallet: string
  email: string
  role: ERoles
}
