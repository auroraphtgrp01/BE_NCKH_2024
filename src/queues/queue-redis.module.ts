import { Module } from '@nestjs/common';
import { QueueRedisService } from './queue-redis.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessorService } from 'src/queues/queue-processor.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'deployContract',
      prefix: 'BullQueue_deployContract'
    })
  ],
  providers: [QueueRedisService, QueueProcessorService],
  exports: [QueueRedisService, QueueProcessorService]
})
export class QueueRedisModule { }
