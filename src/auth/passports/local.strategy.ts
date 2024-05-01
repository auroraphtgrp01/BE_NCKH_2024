import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'addressWallet', passwordField: 'PIN' })
  }

  async validate(addressWallet: string, PIN: string): Promise<any> {
    const user = await this.authService.validateUser(addressWallet, PIN)
    if (!user) {
      throw new UnauthorizedException(RESPONSE_MESSAGES.ADDRESS_WALLET_OR_PIN_IS_INVALID)
    }
    return user
  }
}
