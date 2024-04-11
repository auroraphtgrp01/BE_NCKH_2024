import { Injectable } from '@nestjs/common';
import { CreatePartyInfoDto } from './dto/create-party-info.dto';
import { UpdatePartyInfoDto } from './dto/update-party-info.dto';

@Injectable()
export class PartyInfosService {
  create(createPartyInfoDto: CreatePartyInfoDto) {
    return 'This action adds a new partyInfo';
  }

  findAll() {
    return `This action returns all partyInfos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partyInfo`;
  }

  update(id: number, updatePartyInfoDto: UpdatePartyInfoDto) {
    return `This action updates a #${id} partyInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} partyInfo`;
  }
}
