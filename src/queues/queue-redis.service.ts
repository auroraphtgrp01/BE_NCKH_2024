import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { IStage, IStageDeploy } from 'src/interfaces/smart-contract.interface'

@Injectable()
export class QueueRedisService {
  constructor(
    @InjectQueue('deployContract') private readonly deployContractQueue: Queue,
    @InjectQueue('sendInvitation') private readonly sendInvitationQueue: Queue,
    @InjectQueue('sendRequestSurvey') private readonly sendRequestSurveyQueue: Queue,
    @InjectQueue('resendRequestSurvey') private readonly resendRequestSurveyQueue: Queue
  ) {}

  enqueueDeployContract(job: IQueuePayloadDeployContract) {
    this.deployContractQueue.add('deployContract', job)
  }

  enqueueSendInvitation(job: IQueuePayloadSendInvitation) {
    this.sendInvitationQueue.add('sendInvitation', job)
  }

  enqueueSendRequestSurvey(job: IQueuePayloadSendRequestSurvey) {
    this.sendRequestSurveyQueue.add('sendRequestSurvey', job)
  }

  enqueueResendRequestSurvey(job: IQueuePayloadResendRequestSurvey) {
    this.resendRequestSurveyQueue.add('resendRequestSurvey', job)
  }
}

export interface IQueuePayloadDeployContract {
  contractId: string
  _supplier: string
  _users: string[]
  _total: number
  _stages: IStageDeploy[]
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

export interface IQueuePayloadSendRequestSurvey {
  to: string
  from: string
  receiver: string
  surveyCode: string
  addressWalletSender: string
  messages: string
  link: string
}

export interface IQueuePayloadResendRequestSurvey {
  to: string
  from: string
  receiver: string
  supplierName: string
  surveyCode: string
  messages: string
  link: string
}
