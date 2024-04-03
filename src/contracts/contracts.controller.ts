import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'
import { UpdateContractDto } from './dto/update-contract.dto'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('create-empty')
  async createEmptyContract() {
    return await this.contractsService.createEmptyContract()
  }

  @Post('send-invitation')
  async sendInvitation(@Body() sendInvitationDto: CreateInvitationDto) {
    return await this.contractsService.sendInvitation(sendInvitationDto)
  }

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto)
  }

  @Get()
  findAll() {
    return this.contractsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(+id, updateContractDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id)
  }
}
