import { Module, forwardRef } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { ContractsController } from './contracts.controller'
import { MailModule } from 'src/mailer/mailer.module'
import { UsersModule } from 'src/users/users.module'
import { CommonModule } from 'src/commons/common.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'
import { ContractAttributesModule } from 'src/contract-attributes/contract-attributes.module'
import { ParticipantsModule } from 'src/participants/participants.module'
import { ContractAttributeValuesModule } from 'src/contract-attribute-values/contract-attribute-values.module'
import { SuppliersModule } from 'src/suppliers/suppliers.module'

@Module({
  imports: [
    MailModule,
    UsersModule,
    TemplateContractsModule,
    ContractAttributesModule,
    forwardRef(() => ParticipantsModule),
    ContractAttributeValuesModule,
    SuppliersModule,
    forwardRef(() => CommonModule)
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService]
})
export class ContractsModule {}
