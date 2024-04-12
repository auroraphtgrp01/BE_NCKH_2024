import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateContractPartyInfoDto } from './dto/create-contract-party-info.dto'
import { UpdateContractPartyInfoDto } from './dto/update-contract-party-info.dto'
import { IUser } from 'src/users/interfaces/IUser.interface'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { PartyInfosService } from 'src/party-infos/party-infos.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage'

@Injectable()
export class ContractPartyInfosService {
  constructor(
    @Inject('PrismaService') private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly partyInfosService: PartyInfosService
  ) {}
  async create(createContractPartyInfoDto: CreateContractPartyInfoDto, user: IUser) {
    if ((await this.partyInfosService.findOneById(createContractPartyInfoDto.partyInfoId)) === null)
      throw new NotFoundException(RESPONSE_MESSAGES.PARTY_INFO_NOT_FOUND)
    const contractPartyInfo = await this.prismaService.client.contractPartyInfo.create({
      data: {
        Contract: { connect: { id: createContractPartyInfoDto.contractId } },
        PartyInfo: { connect: { id: createContractPartyInfoDto.partyInfoId } }
      }
    })
    return contractPartyInfo
  }

  findAll() {
    return `This action returns all contractPartyInfos`
  }

  findOne(id: number) {
    return `This action returns a #${id} contractPartyInfo`
  }

  update(id: number, updateContractPartyInfoDto: UpdateContractPartyInfoDto) {
    return `This action updates a #${id} contractPartyInfo`
  }

  remove(id: number) {
    return `This action removes a #${id} contractPartyInfo`
  }
}
