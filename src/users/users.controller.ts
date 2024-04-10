import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { Public } from 'src/decorators/is-public.decorator'
import { Request } from 'express'
import { IUser } from './interfaces/IUser.interface'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request & { user: IUser }) {
    return await this.usersService.create(createUserDto, req.user)
  }

  @Patch('pin/:id')
  @Public()
  async updatePIN(@Body() PIN: UpdateUserPINDto, @Param('id') id: string) {
    return await this.usersService.updatePIN(PIN, id)
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string, @Query('order') order: 'asc' | 'desc') {
    if (!page || !limit) throw new BadRequestException({ message: RESPONSE_MESSAGES.PAGE_OR_LIMIT_NOT_PROVIDED })

    return await this.usersService.findAll(+page, +limit, order)
  }

  @Get('/find-one-by-id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.usersService.findOneById(id)
  }

  @Get(':payload')
  async findOne(@Param('payload') payload: string) {
    return await this.usersService.findOne(payload)
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request & { user: IUser }) {
    return this.usersService.update(updateUserDto, req.user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: IUser }) {
    return this.usersService.remove(id, req.user)
  }

  @Get('address-wallet-exists/:addressWallet')
  @Public()
  async handleAccountExists(@Param('addressWallet') addressWallet: string) {
    if (await this.usersService.findOneByAddressWallet(addressWallet)) return { exists: true }
    return { exists: false }
  }
}
