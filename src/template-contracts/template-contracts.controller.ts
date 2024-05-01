import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TemplateContractsService } from './template-contracts.service'
import { CreateTemplateContractDto } from './dto/create-template-contract.dto'
import { UpdateTemplateContractDto } from './dto/update-template-contract.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('template-contracts')
export class TemplateContractsController {
  constructor(private readonly templateContractsService: TemplateContractsService) {}

  @Post()
  create(@Body() createTemplateContractDto: CreateTemplateContractDto, @User() user: IUser) {
    return this.templateContractsService.create(createTemplateContractDto, user)
  }

  @Get()
  findAll() {
    return this.templateContractsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateContractsService.findOne(+id)
  }

  @Get(':id/attributes')
  async getTemplateContractAttributes(@Param('id') id: string) {
    return { contractAttributes: await this.templateContractsService.getTemplateContractAttributes(id) }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateContractDto: UpdateTemplateContractDto) {
    return this.templateContractsService.update(+id, updateTemplateContractDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateContractsService.remove(+id)
  }
}
