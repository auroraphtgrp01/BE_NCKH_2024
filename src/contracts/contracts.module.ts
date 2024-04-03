import { Module } from '@nestjs/common'
import { ContractsService } from './contracts.service'
import { ContractsController } from './contracts.controller'
import { InvitationsModule } from 'src/invitations/invitations.module'

@Module({
  imports: [InvitationsModule],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
