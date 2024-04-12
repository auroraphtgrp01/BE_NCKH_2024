import { HttpException, Inject, Injectable } from '@nestjs/common'
import { CreatePartyInfoDto } from './dto/create-party-info.dto'
import { UpdatePartyInfoDto } from './dto/update-party-info.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaModule, CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { IExecutor } from 'src/interfaces/executor.interface'
import { PartiesService } from 'src/parties/parties.service'

@Injectable()
export class PartyInfosService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly partiesService: PartiesService
  ) {}
  async create(createPartyInfoDto: CreatePartyInfoDto, user: IUser) {
    if ((await this.partiesService.findOneById(createPartyInfoDto.partiesId)) === null)
      throw new HttpException({ message: 'Party not found' }, 404)

    const isPartyInfoExist = await this.prismaService.client.partyInfo.findFirst({
      where: { userId: user.id, partiesId: createPartyInfoDto.partiesId }
    })
    if (isPartyInfoExist) throw new HttpException({ message: 'Party info is exist' }, 400)
    const createdBy: IExecutor = { id: user.id, name: user.name, email: user.email }
    const { partiesId, ...rest } = createPartyInfoDto
    const partyInfo = await this.prismaService.client.partyInfo.create({
      data: {
        User: { connect: { id: user.id } },
        Parties: {
          connect: { id: partiesId }
        },
        ...rest,
        updatedAt: null,
        createdBy
      }
    })

    return partyInfo
  }

  findAll() {
    return `This action returns all partyInfos`
  }

  async findOneById(id: string) {
    const partyInfo = await this.prismaService.client.partyInfo.findUnique({ where: { id } })
    return partyInfo
  }

  update(id: number, updatePartyInfoDto: UpdatePartyInfoDto) {
    return `This action updates a #${id} partyInfo`
  }

  remove(id: number) {
    return `This action removes a #${id} partyInfo`
  }
}
