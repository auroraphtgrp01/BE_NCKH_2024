import { Injectable } from '@nestjs/common';
import { CreateSmartContractDto } from './dto/create-smart-contract.dto';
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto';
import { readContract } from 'src/utils/readContract.utils';
import { createIgnition } from 'src/utils/generateIgnition';

@Injectable()
export class SmartContractsService {
  create(createSmartContractDto: CreateSmartContractDto) {
    return 'This action adds a new smartContract';
  }

  async getABI(contractName: any) {
    // const abi = readContract('SupplyChain').abi
    // return {
    //   abi
    // }

    const _keys = ["partyNameA", "partyNameB", "partyNameC", "AddressWallet", "email", "phoneNumber"];
    const _values = ["Le Minh Tuan", "Tran Nguyen Duy Khanh", "Nguyen Quang Huy", "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea", "minhtuanledng@gmail.com", '0123123123'];
    const _supplier = "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea"
    const contractId = 'aebb9401-e61d-4e47-9ea2-ebc810608d9s'
    await createIgnition(_keys, _values, _supplier, contractId)
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
