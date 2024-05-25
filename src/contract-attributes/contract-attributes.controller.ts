import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ContractAttributesService } from './contract-attributes.service'
import { CreateContractAttributeDto, CreateContractAttributesDto } from './dto/create-contract-attribute.dto'
import { UpdateContractAttributeDto } from './dto/update-contract-attribute.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'

@Controller('contract-attributes')
export class ContractAttributesController {
  constructor(private readonly contractAttributesService: ContractAttributesService) {}

  @Post()
  create(@Body() createContractAttributeDto: CreateContractAttributeDto, @User() user: IUser) {
    return this.contractAttributesService.create(createContractAttributeDto, user)
  }

  @Post('/create-contract-attributes')
  createContractAttributes(@Body() createContractAttributeDto: CreateContractAttributesDto, @User() user: IUser) {
    return this.contractAttributesService.createContractAttributes(createContractAttributeDto, user)
  }

  @Get(':contractId')
  async findAllByContractId(@Param('contractId') contractId: string) {
    return await this.contractAttributesService.findAllByContractId(contractId)
  }

  @Get('/find-one-by-id/:id')
  findOneById(@Param('id') id: string) {
    return this.contractAttributesService.findOneById(id)
  }

  @Get(':payload')
  findOne(@Param('payload') payload: string) {
    return this.contractAttributesService.findOne(payload)
  }

  @Patch()
  update(@Body() updateContractAttributeDto: UpdateContractAttributeDto, @User() user: IUser) {
    return this.contractAttributesService.update(updateContractAttributeDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractAttributesService.remove(+id)
  }

  @Post('/create-contract-attributes')
  createContractAttributesInBlockchain(
    @Body() createContractAttributeDto: CreateContractAttributesDto,
    @User() user: IUser
  ) {
    return this.contractAttributesService.createContractAttributesInBlockchain(createContractAttributeDto)
  }
}
