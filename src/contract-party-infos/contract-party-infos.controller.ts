import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ContractPartyInfosService } from './contract-party-infos.service'
import { CreateContractPartyInfoDto } from './dto/create-contract-party-info.dto'
import { UpdateContractPartyInfoDto } from './dto/update-contract-party-info.dto'
import { Request } from 'express'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('contract-party-infos')
export class ContractPartyInfosController {
  constructor(private readonly contractPartyInfosService: ContractPartyInfosService) {}

  @Post()
  create(@Body() createContractPartyInfoDto: CreateContractPartyInfoDto, @User() user: IUser) {
    return this.contractPartyInfosService.create(createContractPartyInfoDto, user)
  }

  @Get()
  findAll() {
    return this.contractPartyInfosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractPartyInfosService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractPartyInfoDto: UpdateContractPartyInfoDto) {
    return this.contractPartyInfosService.update(+id, updateContractPartyInfoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractPartyInfosService.remove(+id)
  }
}
