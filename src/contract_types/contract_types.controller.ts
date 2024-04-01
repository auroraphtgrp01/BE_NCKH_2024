import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, BadRequestException } from '@nestjs/common'
import { ContractTypesService } from './contract_types.service'
import { CreateContractTypeDto } from './dto/create-contract_type.dto'
import { UpdateContractTypeDto } from './dto/update-contract_type.dto'
import { Request } from 'express'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Controller('contract-types')
export class ContractTypesController {
  constructor(private readonly contractTypesService: ContractTypesService) {}

  @Post()
  async create(@Body() createContractTypeDto: CreateContractTypeDto, @Req() req: Request & { user: IUser }) {
    return await this.contractTypesService.create(createContractTypeDto, req.user)
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number, order: 'asc' | 'desc') {
    if (!page || !limit) throw new BadRequestException({ message: RESPONSE_MESSAGES.PAGE_OR_LIMIT_NOT_PROVIDED })

    return await this.contractTypesService.findAll(+page, +limit, order)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contractTypesService.findOne(id)
  }

  @Patch()
  update(@Body() updateContractTypeDto: UpdateContractTypeDto, @Req() req: Request & { user: IUser }) {
    return this.contractTypesService.update(updateContractTypeDto, req.user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request & { user: IUser }) {
    return await this.contractTypesService.remove(id, req.user)
  }
}
