import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { CreateContractAttributeDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { Request } from 'express'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('contract-attributes')
export class ContractAttributesController {
  constructor(private readonly contractAttributesService: ContractAttributesService) {}

  @Post()
  create(@Body() createContractAttributeDto: CreateContractAttributeDto, @User() user: IUser) {
    return this.contractAttributesService.create(createContractAttributeDto, user)
  }

  @Get()
  findAll() {
    return this.contractAttributesService.findAll()
  }

  @Get('/find-one-by-id/:id')
  findOneById(@Param('id') id: string) {
    return this.contractAttributesService.findOneById(id)
  }

  @Get(':payload')
  findOne(@Param('payload') payload: string) {
    return this.contractAttributesService.findOne(payload)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractAttributeDto: UpdateContractAttributeDto) {
    return this.contractAttributesService.update(+id, updateContractAttributeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractAttributesService.remove(+id)
  }
}
