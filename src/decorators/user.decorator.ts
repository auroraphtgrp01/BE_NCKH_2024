import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { IUser } from 'src/users/interfaces/IUser.interface'

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user as IUser

  return data ? user?.[data] : user
})
