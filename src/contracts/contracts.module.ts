import { Module } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { ContractsController } from './contracts.controller'
import { InvitationsModule } from 'src/invitations/invitations.module'
import { ContractPartyInfosModule } from 'src/contract-party-infos/contract-party-infos.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
import { CommonService } from 'src/common.service'
import { PartyInfosModule } from 'src/party-infos/party-infos.module'
import { MailModule } from 'src/mailer/mailer.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    InvitationsModule,
    ContractPartyInfosModule,
    ContractAttributesModule,
    ContractAttributeValuesModule,
    PartyInfosModule,
    MailModule,
    TemplateContractsModule,
    UsersModule
  ],
  controllers: [ContractsController],
  providers: [ContractsService, CommonService],
  exports: [ContractsService, CommonService]
})
export class ContractsModule {}
