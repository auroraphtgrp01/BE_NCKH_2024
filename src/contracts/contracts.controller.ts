import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, forwardRef } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { UpdateContractDto } from './dto/update-contract.dto'
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
  async create(@Body('payload') createContractDto: CreateContractDto, @User() user: IUser) {
    return await this.contractsService.create(createContractDto, user)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id)
  }
}
