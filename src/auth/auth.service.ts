import { Inject, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { convertMany } from 'convert'

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
      nam: user.name
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
      nam: user.name
    }

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')
    })
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByAddressWallet(username)
    if (user && user.PIN === password) {
      const { PIN, ...result } = user
      return result
    }
    return null
  }
}
