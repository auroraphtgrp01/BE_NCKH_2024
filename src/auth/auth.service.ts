import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { convertMany } from 'convert'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(user: IUser, res: Response): Promise<any> {
    const refresh_token = this.createRefreshToken(user)

    res.cookie('refresh_token', refresh_token, {
      maxAge: convertMany(this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')).to('ms'),
      httpOnly: true
    })

    await this.prismaService.client.user.update({
      where: { id: user.id },
      data: { refreshToken: refresh_token }
    })

    return {
      access_token: this.createAccessToken(user),
      refresh_token,
      id: user.id,
      name: user.name,
      addressWallet: user.addressWallet,
      email: user.email
    }
  }

  createAccessToken(user: IUser) {
    const payload = {
      sub: 'Access Token',
      iss: 'From Server',
      id: user.id,
      addressWallet: user.addressWallet,
      email: user.email,
      name: user.name
    }

    return this.jwtService.sign(payload)
  }

  createRefreshToken(user: IUser) {
    const payload = {
      sub: 'Refresh Token',
      iss: 'From Server',
      id: user.id,
      addressWallet: user.addressWallet,
      email: user.email,
      name: user.name
    }

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')
    })
  }

  async validateUser(addressWallet: string, PIN: string): Promise<any> {
    const user = await this.usersService.findOneByAddressWallet(addressWallet)

    if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    if (user.PIN === null) throw new UnauthorizedException({ message: RESPONSE_MESSAGES.PIN_NOT_SET })
    if (user && (await compare(PIN, user.PIN)) === true) {
      const { PIN, ...result } = user
      return result
    }
    return null
  }
}
