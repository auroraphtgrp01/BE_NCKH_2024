import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ParticipantsService } from './participants.service'
import { CreateParticipantDto, SendInvitationsDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { User } from 'src/decorators/user.decorator'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { ParticipantStatus } from '@prisma/client'

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto, @User() user: IUser) {
    return await this.participantsService.create(createParticipantDto, user)
  }

  @Post('send-invitation')
  async sendInvitation(@Body() sendInvitationDto: SendInvitationsDto, @User() user: IUser) {
    return await this.participantsService.sendInvitation(sendInvitationDto, user)
  }

  @Get()
  findAll() {
    return this.participantsService.findAll()
  }

  @Get('/find-one/:email/:contractId')
  findOne(@Param('email') email: string, @Param('contractId') contractId: string) {
    return this.participantsService.findOne(email, contractId)
  }

  @Patch()
  async update(@Body() updateParticipantDto: UpdateParticipantDto, @User() user: IUser) {
    return await this.participantsService.update(updateParticipantDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id)
  }
}
