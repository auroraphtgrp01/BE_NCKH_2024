import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateInvitationDto } from './dto/create-invitation.dto'
import { UpdateInvitationDto } from './dto/update-invitation.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { MailPayload } from 'src/mailer/mail-payload.i'
import { MailService } from 'src/mailer/mailer.service'

@Injectable()
export class InvitationsService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>, private mailService: MailService) { }

  async create(createInvitationDto: CreateInvitationDto, _user: IUser) {
    const user = await this.prismaService.client.user.findUnique({ where: { id: createInvitationDto.idUserSender } })
    if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
    const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
    const invitation = await this.prismaService.client.invitation.create({
      data: { ...createInvitationDto, updatedAt: null, createdBy }
    })
    const payload: MailPayload = {
      to: createInvitationDto.email,
      from: _user.email,
      messages: createInvitationDto.message,
      link: `http://localhost:3000/invitation/${invitation.id}`,
      receiver: createInvitationDto.email,
      addressWalletSender: '0x1234567890',
      contractName: 'Contract Name',
    }
    await this.mailService.sendMail(payload)
    return invitation
  }

  async sendInvitation(createInvitationDto: CreateInvitationDto[], _user: IUser) {
    createInvitationDto.map(async (invition: CreateInvitationDto) => {
      const user = await this.prismaService.client.user.findUnique({ where: { id: invition.idUserSender } })
      if (!user) throw new NotFoundException({ message: RESPONSE_MESSAGES.USER_NOT_FOUND })
      const createdBy: IExecutor = { id: _user.id, name: _user.name, email: _user.email }
      const invitation = await this.prismaService.client.invitation.create({
        data: { ...invition, updatedAt: null, createdBy }
      })
      const payload: MailPayload = {
        to: invition.email,
        from: _user.email,
        messages: invition.message,
        link: 'O day se la duong dan den contract',
        receiver: invition.email,
        addressWalletSender: '0x1234567890',
        contractName: 'Contract Name',
      }
      await this.mailService.sendMail(payload)
      return invitation
    })
  }

  findAll() {
    return `This action returns all invitations`
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`
  }
}
