import { Module } from '@nestjs/common';
import { QueueRedisService } from './queue-redis.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessorSendInvitation, QueueProcessorService } from 'src/queues/queue-processor.service';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'deployContract',
      prefix: 'BullQueue_deployContract'
    }, {
      name: 'sendInvitation',
      prefix: 'BullQueue_sendInvitation'
    }),
    MailModule
  ],
  providers: [QueueRedisService, QueueProcessorService, QueueProcessorSendInvitation],
  exports: [QueueRedisService, QueueProcessorService, QueueProcessorSendInvitation]
})
export class QueueRedisModule { }
