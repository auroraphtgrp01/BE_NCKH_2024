import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Request, Response } from 'express'
import { Public } from 'src/decorators/is-public.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'
import { UsersService } from 'src/users/users.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    return await this.authService.login(user, res)
  }

  @Post('register')
  @Public()
  async register(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload)
  }

  @Get(':addressWallet')
  @Public()
  async handleAddressWallet(@Param('addressWallet') addressWallet: string) {
    return {
      isExits: await this.authService.handleAddressWallet(addressWallet)
    }
  }

  @Get('get-user-info-login')
  getUserInfoLogin(@User() user: IUser) {
    return this.authService.getUserInfoLogin(user)
  }
}
