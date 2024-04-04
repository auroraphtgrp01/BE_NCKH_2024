import { CreateSmartContractDto } from './dto/create-smart-contract.dto';
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto';
export declare class SmartContractsService {
    create(createSmartContractDto: CreateSmartContractDto): string;
    getABI(contractName: any): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateSmartContractDto: UpdateSmartContractDto): string;
    remove(id: number): string;
}
