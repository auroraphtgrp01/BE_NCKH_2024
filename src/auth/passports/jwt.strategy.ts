import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY')
    })
  }

  async validate(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      addressWallet: user.addressWallet,
      email: user.email,
      role: user.role
    }
  }
}
