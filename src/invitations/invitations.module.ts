import { Module } from '@nestjs/common'
import { InvitationsService } from './invitations.service'
import { InvitationsController } from './invitations.controller'
import { UsersModule } from 'src/users/users.module'
import { MailModule } from 'src/mailer/mailer.module'
import { QueueRedisModule } from 'src/queues/queue-redis.module'

@Module({
  imports: [UsersModule, MailModule, QueueRedisModule],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService]
})
export class InvitationsModule { }
