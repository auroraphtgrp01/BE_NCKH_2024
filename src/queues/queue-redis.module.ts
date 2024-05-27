import { Module } from '@nestjs/common'
import { QueueRedisService } from './queue-redis.service'
import { BullModule } from '@nestjs/bullmq'
import {
  QueueProcessorResendRequestSurvey,
  QueueProcessorSendInvitation,
  QueueProcessorSendRequestSurvey,
  QueueProcessorService
} from 'src/queues/queue-processor.service'
import { MailModule } from 'src/mailer/mailer.module'

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'deployContract',
        prefix: 'BullQueue_deployContract'
      },
      {
        name: 'sendInvitation',
        prefix: 'BullQueue_sendInvitation'
      },
      {
        name: 'sendRequestSurvey',
        prefix: 'BullQueue_sendRequestSurvey'
      },
      {
        name: 'resendRequestSurvey',
        prefix: 'BullQueue_resendRequestSurvey'
      }
    ),
    MailModule
  ],
  providers: [
    QueueRedisService,
    QueueProcessorService,
    QueueProcessorSendInvitation,
    QueueProcessorSendRequestSurvey,
    QueueProcessorResendRequestSurvey
  ],
  exports: [
    QueueRedisService,
    QueueProcessorService,
    QueueProcessorSendInvitation,
    QueueProcessorSendRequestSurvey,
    QueueProcessorResendRequestSurvey
  ]
})
export class QueueRedisModule {}
