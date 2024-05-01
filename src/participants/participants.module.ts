import { Module, forwardRef } from '@nestjs/common'
import { ParticipantsService } from './participants.service'
import { ParticipantsController } from './participants.controller'
import { UsersModule } from 'src/users/users.module'
import { ContractsModule } from 'src/contracts/contracts.module'
import { MailModule } from 'src/mailer/mailer.module'
import { QueueRedisModule } from 'src/queues/queue-redis.module'

@Module({
  imports: [UsersModule, forwardRef(() => ContractsModule), MailModule, QueueRedisModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService]
})
export class ParticipantsModule {}
