import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ContractAttributeValuesService } from './contract-attribute-values.service'
import { CreateContractAttributeValueDto } from './dto/create-contract-attribute-value.dto'
import { UpdateContractAttributeValueDto } from './dto/update-contract-attribute-value.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Controller('contract-attribute-values')
export class ContractAttributeValuesController {
  constructor(private readonly contractAttributeValuesService: ContractAttributeValuesService) {}

  @Post()
  create(@Body() createContractAttributeValueDto: CreateContractAttributeValueDto, @User() user: IUser) {
    return this.contractAttributeValuesService.create(createContractAttributeValueDto, user)
  }

  @Get()
  findAll() {
    return this.contractAttributeValuesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractAttributeValuesService.findOne(+id)
  }

  @Patch()
  update(@Body() updateContractAttributeValueDto: UpdateContractAttributeValueDto, @User() user: IUser) {
    return this.contractAttributeValuesService.update(updateContractAttributeValueDto, user)
  }
}
