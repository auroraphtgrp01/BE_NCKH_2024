import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { CreateContractDto } from './dto/create-contract.dto'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { UpdateContractDto } from './dto/update-contract.dto'

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('send-invitation')
  async sendInvitation(@Body() sendInvitationDto: CreateInvitationDto) {
    return await this.contractsService.sendInvitation(sendInvitationDto)
  }

  @Post()
  async create(@Body('contractData') contractData: CreateContractDto, @Body('templateId') templateId?: string) {
    return await this.contractsService.create(contractData, templateId)
  }

  @Get()
  findAll() {
    return this.contractsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id)
  }

  @Patch()
  update(@Body() updateContractDto: UpdateContractDto) {
    return this.contractsService.update(updateContractDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id)
  }
}
