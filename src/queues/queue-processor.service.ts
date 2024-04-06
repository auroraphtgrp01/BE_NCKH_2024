// import { Process, Processor } from "@nestjs/bull";
import { WorkerHost, Processor, OnWorkerEvent } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { IQueuePayloadDeployContract } from "src/queues/queue-redis.service";
import { deployContract } from "src/utils/generateIgnition";

@Processor('deployContract')
export class QueueProcessorService extends WorkerHost {
    private logger = new Logger();
    async process(job: Job<IQueuePayloadDeployContract, string, string>, token?: string): Promise<string> {
        switch (job.name) {
            case 'deployContract':
                const { _keys, _values, _supplier, contractId } = job.data
                console.log('Processing contract...');
                try {
                    await deployContract(_keys, _values, _supplier, contractId)
                    this.logger.log(`Contract id ${contractId} processed successfully`);
                    return `Contract id ${contractId} processed successfully`;
                } catch (error) {
                    console.log('Error processing contract...', error);
                }
            default:
                throw new Error('No job name match');
        }
    }

    @OnWorkerEvent('active')
    onQueueActive(job: Job) {
        this.logger.log(`Job has been started: ${job.id}`);
    }

    @OnWorkerEvent('completed')
    onQueueComplete(job: Job, result: any) {
        this.logger.log(`Job has been finished: ${job.id}`);
    }

    @OnWorkerEvent('failed')
    onQueueFailed(job: Job, err: any) {
        this.logger.log(`Job has been failed: ${job.id}`);
        this.logger.log({ err });
    }

    @OnWorkerEvent('error')
    onQueueError(err: any) {
        this.logger.log(`Job has got error: `);
        this.logger.log({ err });
    }
}