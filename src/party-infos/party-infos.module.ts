import { Module } from '@nestjs/common'
import { PartyInfosService } from './party-infos.service'
import { PartyInfosController } from './party-infos.controller'
import { PartiesModule } from 'src/parties/parties.module'

@Module({
  imports: [PartiesModule],
  controllers: [PartyInfosController],
  providers: [PartyInfosService],
  exports: [PartyInfosService]
})
export class PartyInfosModule {}
