import { Injectable } from '@nestjs/common'
import { CreateSmartContractDto } from './dto/create-smart-contract.dto'
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto'
import { readContract } from 'src/utils/readContract.utils'
import { deployContract } from 'src/utils/generateIgnition'
import { IQueuePayloadDeployContract, QueueRedisService } from 'src/queues/queue-redis.service'
import { IKeyValueSmartContract } from 'src/interfaces/smart-contract.interface'

@Injectable()
export class SmartContractsService {
  constructor(private readonly deloyContractService: QueueRedisService) {}
  create(createSmartContractDto: CreateSmartContractDto) {
    return 'This action adds a new smartContract'
  }

  async getABI(contractName: any) {
    const abi = readContract('SupplyChain').abi
    return {
      abi
    }
  }

  async deployContract(
    payload: IKeyValueSmartContract,
    contractId: string,
    _supplier: string,
    _users: string[],
    _total: number
  ) {
    const { keys, values } = payload

    const payloadData: IQueuePayloadDeployContract = {
      _keys: keys,
      _values: values,
      _supplier,
      contractId,
      _users,
      _total
    }
    this.deloyContractService.enqueueDeployContract(payloadData)
    // await deployContract(_keys, _values, _supplier, contractId)
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
