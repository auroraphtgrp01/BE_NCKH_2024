import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePartyDto } from './dto/create-party.dto'
import { UpdatePartyDto } from './dto/update-party.dto'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'
import { IExecutor } from 'src/interfaces/executor.interface'
import { IUser } from 'src/users/interfaces/IUser.interface'

@Injectable()
export class PartiesService {
  constructor(@Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>) {}
  async create(createPartyDto: CreatePartyDto, _user: IUser) {
    const isPartyExist = await this.prismaService.client.parties.findFirst({
      where: {
        partyName: createPartyDto.partyName,
        OR: [
          { taxCode: createPartyDto.taxCode },
          { email: createPartyDto.email },
          { phoneNumber: createPartyDto.phoneNumber }
        ]
      }
    })
    if (isPartyExist) throw new NotFoundException(RESPONSE_MESSAGES.PARTY_IS_EXIST)
    const createdBy: IExecutor = { email: _user.email, id: _user.id, name: _user.name }
    const party = await this.prismaService.client.parties.create({ data: { ...createPartyDto, createdBy } })
    return party
  }

  findAll() {
    return `This action returns all parties`
  }

  findOne(id: number) {
    return `This action returns a #${id} party`
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`
  }

  remove(id: number) {
    return `This action removes a #${id} party`
  }
}
