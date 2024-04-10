import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { PartiesService } from './parties.service'
import { CreatePartyDto } from './dto/create-party.dto'
import { UpdatePartyDto } from './dto/update-party.dto'
import { Request } from 'express'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  async create(@Body() createPartyDto: CreatePartyDto, @Req() req: Request & { user: IUser }) {
    return this.partiesService.create(createPartyDto, req.user)
  }

  @Get()
  findAll() {
    return this.partiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(+id, updatePartyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.remove(+id)
  }
}
