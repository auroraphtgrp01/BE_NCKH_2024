import { Module, forwardRef } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { ContractsController } from './contracts.controller'
import { InvitationsModule } from 'src/invitations/invitations.module'
import { MailModule } from 'src/mailer/mailer.module'
import { UsersModule } from 'src/users/users.module'
import { CommonModule } from 'src/commons/common.module'
import { TemplateContractsModule } from 'src/template-contracts/template-contracts.module'

@Module({
  imports: [InvitationsModule, MailModule, UsersModule, forwardRef(() => CommonModule), TemplateContractsModule],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService]
})
export class ContractsModule {}
