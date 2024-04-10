import { Module } from '@nestjs/common';
import { PartyInfosService } from './party-infos.service';
import { PartyInfosController } from './party-infos.controller';

@Module({
  controllers: [PartyInfosController],
  providers: [PartyInfosService],
})
export class PartyInfosModule {}
