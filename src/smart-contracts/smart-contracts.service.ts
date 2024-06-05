import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateSmartContractDto } from './dto/create-smart-contract.dto'
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto'
import { readContract } from 'src/utils/readContract.utils'
import { IQueuePayloadDeployContract, QueueRedisService } from 'src/queues/queue-redis.service'
import { IKeyValue, IStage } from 'src/interfaces/smart-contract.interface'
import { ethers } from 'ethers'
import { ContractsService } from 'src/contracts/contracts.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { OrdersService } from 'src/orders/orders.service'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions'
import { ETypeContractAttribute } from 'src/constants/enum.constant'

@Injectable()
export class SmartContractsService {
  constructor(
    @Inject('PrismaService') private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly deloyContractService: QueueRedisService,
    private readonly contractService: ContractsService
  ) {}
  create(createSmartContractDto: CreateSmartContractDto) {
    return 'This action adds a new smartContract'
  }

  async getABI(type: 'disputed | supplyChain') {
    const abi = readContract(type)
    return {
      abi,
      type
    }
  }

  async deployContract(contractId: string, _supplier: string, _users: string[]) {
    const dataContract = await this.contractService.getContractDetailsById(contractId)
    if (!dataContract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

    const _total = Number(
      dataContract.contractAttributes.find(
        (contractAttribute) => contractAttribute.type === ETypeContractAttribute.TOTAL_AMOUNT
      ).value
    )

    const { participants, ...payload } = dataContract
    const _stages = payload.contract.stages.map((stage: any) => {
      const date = new Date(stage.deliveryAt)
      return {
        percent: stage.percent,
        deliveryAt: date.getTime() / 1000,
        description: stage.description ? stage.description : ''
      }
    })
    const payloadData: IQueuePayloadDeployContract = {
      _supplier,
      contractId,
      _users,
      _total,
      _stages
    }
    this.deloyContractService.enqueueDeployContract(payloadData)
  }

  // async deployContract(payload: any, contractId: string, _supplier: string) {
  //   const _keys = []
  //   const _values = []

  //   for (const key in payload) {
  //     _keys.push(key)
  //     _values.push(payload[key])
  //   }

  //   const payloadData: IQueuePayloadDeployContract = {
  //     _keys,
  //     _values,
  //     _supplier,
  //     contractId
  //   }
  //   this.deloyContractService.enqueueDeployContract(payloadData)
  //   // await deployContract(_keys, _values, _supplier, contractId)
  // }

  findOne(id: number) {
    return `This action returns a #${id} smartContract`
  }

  update(id: number, updateSmartContractDto: UpdateSmartContractDto) {
    return `This action updates a #${id} smartContract`
  }

  remove(id: number) {
    return `This action removes a #${id} smartContract`
  }
}
