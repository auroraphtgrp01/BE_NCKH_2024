import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartyInfosService } from './party-infos.service';
import { CreatePartyInfoDto } from './dto/create-party-info.dto';
import { UpdatePartyInfoDto } from './dto/update-party-info.dto';

@Controller('party-infos')
export class PartyInfosController {
  constructor(private readonly partyInfosService: PartyInfosService) {}

  @Post()
  create(@Body() createPartyInfoDto: CreatePartyInfoDto) {
    return this.partyInfosService.create(createPartyInfoDto);
  }

  @Get()
  findAll() {
    return this.partyInfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyInfosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyInfoDto: UpdatePartyInfoDto) {
    return this.partyInfosService.update(+id, updatePartyInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyInfosService.remove(+id);
  }
}
