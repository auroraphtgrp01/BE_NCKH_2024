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
const generateIgnition_1 = require("../utils/generateIgnition");
let SmartContractsService = class SmartContractsService {
    create(createSmartContractDto) {
        return 'This action adds a new smartContract';
    }
    async getABI(contractName) {
        const _keys = ["partyNameA", "partyNameB", "partyNameC", "AddressWallet", "email", "phoneNumber"];
        const _values = ["Le Minh Tuan", "Tran Nguyen Duy Khanh", "Nguyen Quang Huy", "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea", "minhtuanledng@gmail.com", '0123123123'];
        const _supplier = "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea";
        const contractId = 'aebb9401-e61d-4e47-9ea2-ebc810608d9s';
        await (0, generateIgnition_1.createIgnition)(_keys, _values, _supplier, contractId);
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