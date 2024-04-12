import { Module } from '@nestjs/common'
import { ContractPartyInfosService } from './contract-party-infos.service'
import { ContractPartyInfosController } from './contract-party-infos.controller'
import { PartyInfosModule } from 'src/party-infos/party-infos.module'

@Module({
  imports: [PartyInfosModule],
  controllers: [ContractPartyInfosController],
  providers: [ContractPartyInfosService],
  exports: [ContractPartyInfosService]
})
export class ContractPartyInfosModule {}
