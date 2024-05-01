import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'

@Injectable()
export class QueueRedisService {
  constructor(
    @InjectQueue('deployContract') private readonly deployContractQueue: Queue,
    @InjectQueue('sendInvitation') private readonly sendInvitationQueue: Queue
  ) {}

  enqueueDeployContract(job: IQueuePayloadDeployContract) {
    this.deployContractQueue.add('deployContract', job)
  }

  enqueueSendInvitation(job: IQueuePayloadSendInvitation) {
    this.sendInvitationQueue.add('sendInvitation', job)
  }
}

export interface IQueuePayloadDeployContract {
  contractId: string
  _keys: string[]
  _values: string[]
  _supplier: string
}

export interface IQueuePayloadSendInvitation {
  to: string
  from: string
  receiver: string
  contractName: string
  addressWalletSender: string
  messages: string
  link: string
  idParticipant: string
}
