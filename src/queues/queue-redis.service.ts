import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'

@Injectable()
export class QueueRedisService {
  constructor(@InjectQueue('deployContract') private readonly deployContractQueue: Queue) {}

  enqueueDeployContract(job: IQueuePayloadDeployContract) {
    this.deployContractQueue.add('deployContract', job)
  }
}

export interface IQueuePayloadDeployContract {
  contractId: string
  _keys: string[]
  _values: string[]
  _supplier: string
}
