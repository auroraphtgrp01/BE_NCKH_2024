import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { PartyInfosService } from './party-infos.service'
import { CreatePartyInfoDto } from './dto/create-party-info.dto'
import { UpdatePartyInfoDto } from './dto/update-party-info.dto'
import { Request } from 'express'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('party-infos')
export class PartyInfosController {
  constructor(private readonly partyInfosService: PartyInfosService) {}

  @Post()
  async create(@Body() createPartyInfoDto: CreatePartyInfoDto, @User() user: IUser) {
    return await this.partyInfosService.create(createPartyInfoDto, user)
  }

  @Get()
  findAll() {
    return this.partyInfosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyInfosService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyInfoDto: UpdatePartyInfoDto) {
    return this.partyInfosService.update(+id, updatePartyInfoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyInfosService.remove(+id)
  }
}
