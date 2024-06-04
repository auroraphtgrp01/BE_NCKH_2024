import { ParticipantStatus } from '@prisma/client'
import { ERoleParticipant } from 'src/constants/enum.constant'

export interface IUpdateParticipant {
  email?: string
  User?: any
}

export interface ICreateInvitation {
  email: string
  messages?: string
  permission: IPermissionContract
}

export interface IPermissionContract {
  CHANGE_STATUS_CONTRACT: boolean
  EDIT_CONTRACT: boolean
  INVITE_PARTICIPANT: boolean
  READ_CONTRACT: boolean
  SET_OWNER_PARTY: boolean
  ROLES: ERoleParticipant
}

export interface ICreateParticipant {
  email: string
  permission: IPermissionContract
  userId?: string
  status?: ParticipantStatus
  contractId: string
}
