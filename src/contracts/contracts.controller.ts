import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { AnotherDto, ContractAttributeValuesDto, CreateContractDto } from './dto/create-contract.dto'
import { CreateInvitationDto } from 'src/invitations/dto/create-invitation.dto'
import { UpdateContractDto } from './dto/update-contract.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { User } from 'src/decorators/user.decorator'
import { CommonService } from 'src/common.service'
@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    private readonly commonService: CommonService
  ) {}

  @Post('send-invitation')
  async sendInvitation(@Body() sendInvitationDto: CreateInvitationDto, @User() user: IUser) {
    // return await this.contractsService.sendInvitation(sendInvitationDto, user)
  }

  @Post()
  async create(
    @Body('contractData') contractData: CreateContractDto,
    @User() user: IUser,
    @Body('another') another: AnotherDto,
    @Body('templateId') templateId?: string,
    @Body('partyInfoIds') partyInfoIds?: string[]
  ) {
    return await this.contractsService.create(contractData, user, another, templateId, partyInfoIds)
  }

  @Get()
  findAll() {
    return this.contractsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOneContractById(id)
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
