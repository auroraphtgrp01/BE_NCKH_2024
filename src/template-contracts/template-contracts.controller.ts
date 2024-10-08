import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TemplateContractsService } from './template-contracts.service'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { UpdateContractAttributeDto } from 'src/contracts/dto/update-contract.dto'

@Controller('template-contracts')
export class TemplateContractsController {
  constructor(private readonly templateContractsService: TemplateContractsService) {}

  @Post()
  create(@Body() createTemplateContractDto: CreateTemplateContractDto, @User() user: IUser) {
    return this.templateContractsService.create(createTemplateContractDto, user)
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return await this.templateContractsService.findAll(+page, +limit)
  }

  @Get('/find-all-for-client')
  async findAllForClient() {
    return await this.templateContractsService.findAllForClient()
  }

  @Get(':id/attributes')
  async getTemplateContractAttributes(@Param('id') id: string) {
    return { contractAttributes: await this.templateContractsService.getTemplateContractAttributes(id) }
  }

  @Patch()
  update(@Body() updateTemplateContractDto: UpdateContractAttributeDto, user: IUser) {
    return this.templateContractsService.update(updateTemplateContractDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.templateContractsService.remove(id, user)
  }
}
