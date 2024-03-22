import { Injectable } from '@nestjs/common';
import { CreateSmartContractDto } from './dto/create-smart-contract.dto';
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto';
import { readContract } from 'src/utils/readContract.utils';

@Injectable()
export class SmartContractsService {
  create(createSmartContractDto: CreateSmartContractDto) {
    return 'This action adds a new smartContract';
  }

  getABI(contractName: any) {
    const abi = readContract(contractName.contractName).abi
    return {
      abi
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} smartContract`;
  }

  update(id: number, updateSmartContractDto: UpdateSmartContractDto) {
    return `This action updates a #${id} smartContract`;
  }

  remove(id: number) {
    return `This action removes a #${id} smartContract`;
  }
}
