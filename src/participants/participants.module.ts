import { Module, forwardRef } from '@nestjs/common'
import { ParticipantsService } from './participants.service'
import { ParticipantsController } from './participants.controller'
import { UsersModule } from 'src/users/users.module'
import { ContractsModule } from 'src/contracts/contracts.module'
import { MailModule } from 'src/mailer/mailer.module'
import { QueueRedisModule } from 'src/queues/queue-redis.module'
import { CommonModule } from 'src/commons/common.module'

@Module({
  imports: [UsersModule, forwardRef(() => ContractsModule), MailModule, QueueRedisModule, CommonModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService]
})
export class ParticipantsModule {}
