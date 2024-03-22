"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsController = void 0;
const common_1 = require("@nestjs/common");
const smart_contracts_service_1 = require("./smart-contracts.service");
const create_smart_contract_dto_1 = require("./dto/create-smart-contract.dto");
const update_smart_contract_dto_1 = require("./dto/update-smart-contract.dto");
let SmartContractsController = class SmartContractsController {
    constructor(smartContractsService) {
        this.smartContractsService = smartContractsService;
    }
    create(createSmartContractDto) {
        return this.smartContractsService.create(createSmartContractDto);
    }
    getABI(contractName) {
        console.log(contractName);
        return this.smartContractsService.getABI(contractName);
    }
    findOne(id) {
        return this.smartContractsService.findOne(+id);
    }
    update(id, updateSmartContractDto) {
        return this.smartContractsService.update(+id, updateSmartContractDto);
    }
    remove(id) {
        return this.smartContractsService.remove(+id);
    }
};
exports.SmartContractsController = SmartContractsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_contract_dto_1.CreateSmartContractDto]),
    __metadata("design:returntype", void 0)
], SmartContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/abi'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SmartContractsController.prototype, "getABI", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SmartContractsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_smart_contract_dto_1.UpdateSmartContractDto]),
    __metadata("design:returntype", void 0)
], SmartContractsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SmartContractsController.prototype, "remove", null);
exports.SmartContractsController = SmartContractsController = __decorate([
    (0, common_1.Controller)('smart-contracts'),
    __metadata("design:paramtypes", [smart_contracts_service_1.SmartContractsService])
], SmartContractsController);
//# sourceMappingURL=smart-contracts.controller.js.map