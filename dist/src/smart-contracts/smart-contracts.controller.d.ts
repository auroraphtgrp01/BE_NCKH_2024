import { SmartContractsService } from './smart-contracts.service';
import { CreateSmartContractDto } from './dto/create-smart-contract.dto';
import { UpdateSmartContractDto } from './dto/update-smart-contract.dto';
export declare class SmartContractsController {
    private readonly smartContractsService;
    constructor(smartContractsService: SmartContractsService);
    create(createSmartContractDto: CreateSmartContractDto): string;
    getABI(contractName: object): Promise<void>;
    findOne(id: string): string;
    update(id: string, updateSmartContractDto: UpdateSmartContractDto): string;
    remove(id: string): string;
}
