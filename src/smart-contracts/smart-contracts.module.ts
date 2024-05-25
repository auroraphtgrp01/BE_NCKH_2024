import { Module } from '@nestjs/common'
import { SmartContractsService } from './smart-contracts.service'
import { SmartContractsController } from './smart-contracts.controller'
import { QueueRedisModule } from 'src/queues/queue-redis.module'
import { ContractsModule } from 'src/contracts/contracts.module'

@Module({
  imports: [QueueRedisModule, ContractsModule],
  controllers: [SmartContractsController],
  providers: [SmartContractsService]
})
export class SmartContractsModule {}
