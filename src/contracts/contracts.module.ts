import { Module } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { ContractsController } from './contracts.controller'
import { InvitationsModule } from 'src/invitations/invitations.module'
import { ContractPartyInfosModule } from 'src/contract-party-infos/contract-party-infos.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
import { CommonService } from 'src/common.service'

@Module({
  imports: [InvitationsModule, ContractPartyInfosModule, ContractAttributesModule, ContractAttributeValuesModule],
  controllers: [ContractsController],
  providers: [ContractsService, CommonService],
  exports: [ContractsService, CommonService]
})
export class ContractsModule {}
