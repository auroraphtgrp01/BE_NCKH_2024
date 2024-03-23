import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Request, Response } from 'express'
import { Public } from 'src/decorators/is-public.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: IUser }, @Res({ passthrough: true }) res: Response) {
    return await this.authService.login(req.user, res)
  }
}
