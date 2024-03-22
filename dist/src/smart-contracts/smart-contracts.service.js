"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsService = void 0;
const common_1 = require("@nestjs/common");
const readContract_utils_1 = require("../utils/readContract.utils");
let SmartContractsService = class SmartContractsService {
    create(createSmartContractDto) {
        return 'This action adds a new smartContract';
    }
    getABI(contractName) {
        const abi = (0, readContract_utils_1.readContract)(contractName.contractName).abi;
        return {
            abi
        };
    }
    findOne(id) {
        return `This action returns a #${id} smartContract`;
    }
    update(id, updateSmartContractDto) {
        return `This action updates a #${id} smartContract`;
    }
    remove(id) {
        return `This action removes a #${id} smartContract`;
    }
};
exports.SmartContractsService = SmartContractsService;
exports.SmartContractsService = SmartContractsService = __decorate([
    (0, common_1.Injectable)()
], SmartContractsService);
//# sourceMappingURL=smart-contracts.service.js.map