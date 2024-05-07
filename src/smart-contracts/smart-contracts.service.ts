import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateSmartContractDto } from './dto/create-smart-contract.dto'
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto'
import { readContract } from 'src/utils/readContract.utils'
import { IQueuePayloadDeployContract, QueueRedisService } from 'src/queues/queue-redis.service'
import { IKeyValue, IStage } from 'src/interfaces/smart-contract.interface'
import { ethers } from 'ethers'
import { ContractsService } from 'src/contracts/contracts.service'
import { RESPONSE_MESSAGES } from 'src/constants/responseMessage.constant'
import { OrdersService } from 'src/orders/orders.service'

@Injectable()
export class SmartContractsService {
  constructor(
    private readonly deloyContractService: QueueRedisService,
    private readonly contractService: ContractsService,
    private readonly orderService: OrdersService
  ) {}
  create(createSmartContractDto: CreateSmartContractDto) {
    return 'This action adds a new smartContract'
  }

  async getABI(contractName: any) {
    const abi = readContract('d01ae844-cf71-478d-8d7e-ea8733c5a72b')
    return {
      abi
    }
  }

  async deployContract(contractId: string, _supplier: string, _users: string[], _total?: number, orderId?: string) {
    const dataContract = await this.contractService.getContractDetailsById(contractId)
    if (!dataContract) throw new NotFoundException({ message: RESPONSE_MESSAGES.CONTRACT_IS_NOT_FOUND })

    if (orderId) {
      const order = await this.orderService.findOneById(orderId)
      if (!order) throw new NotFoundException({ message: RESPONSE_MESSAGES.ORDER_IS_NOT_FOUND })
      _total = order.products.reduce((acc, product: any) => acc + product.price, 0)
    } else if (!orderId && !_total) throw new UnauthorizedException({ message: RESPONSE_MESSAGES.TOTAL_IS_REQUIRED })

    const { participants, ...payload } = dataContract
    const _stages = payload.contract.stages.map((stage: any) => {
      const date = new Date(stage.deliveryAt)
      return {
        percent: stage.percent,
        deliveryAt: date.getTime() / 1000,
        description: stage.description ? stage.description : ''
      }
    })
    const _keys: string[] = Object.keys(payload)
    const listVal = Object.values(payload)

    const _values: string[] = listVal.map((val) => ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(val))))
    const payloadData: IQueuePayloadDeployContract = {
      _keys,
      _values,
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
