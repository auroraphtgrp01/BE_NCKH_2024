import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, forwardRef } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'
import { UpdateContractAttributeDto, UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'
import { CommonService } from 'src/commons/common.service'
@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    @Inject(forwardRef(() => CommonService)) private readonly commonService: CommonService
  ) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto, @User() user: IUser) {
    return await this.contractsService.create(createContractDto, user)
  }

  @Get('get-contract-details/:contractId')
  async getContractDetailsById(@Param('contractId') contractId: string) {
    return await this.contractsService.getContractDetailsById(contractId)
  }

  @Get()
  findAll() {
    return this.contractsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOneById(id)
  }

  @Patch()
  update(@Body() updateContractDto: UpdateContractDto, @User() user: IUser) {
    return this.contractsService.update(updateContractDto, user)
  }

  @Patch('attribute') 
  updateContractAttribute(@Body() updateContractAttributeDto: UpdateContractAttributeDto, @User() user: IUser) {
    return this.contractsService.updateContractAttribute(updateContractAttributeDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id)
  }
}
