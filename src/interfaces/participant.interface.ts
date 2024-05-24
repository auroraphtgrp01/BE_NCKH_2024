export interface IUpdateParticipant {
  email?: string
  User?: any
}

export interface ICreateInvitation {
  email: string
  messages: string
  permission: IPermissionContract
}

export interface IPermissionContract {
  CHANGE_STATUS_CONTRACT: boolean
  EDIT_CONTRACT: boolean
  INVITE_PARTICIPANT: boolean
  READ_CONTRACT: boolean
  SET_OWNER_PARTY: boolean
}
