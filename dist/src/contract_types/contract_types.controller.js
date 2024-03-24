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
exports.ContractTypesController = void 0;
const common_1 = require("@nestjs/common");
const contract_types_service_1 = require("./contract_types.service");
const create_contract_type_dto_1 = require("./dto/create-contract_type.dto");
const update_contract_type_dto_1 = require("./dto/update-contract_type.dto");
const responseMessage_1 = require("../constants/responseMessage");
let ContractTypesController = class ContractTypesController {
    constructor(contractTypesService) {
        this.contractTypesService = contractTypesService;
    }
    async create(createContractTypeDto, req) {
        return await this.contractTypesService.create(createContractTypeDto, req.user);
    }
    async findAll(page, limit, order) {
        if (!page || !limit)
            throw new common_1.BadRequestException({ message: responseMessage_1.RESPONSE_MESSAGES.PAGE_OR_LIMIT_NOT_PROVIDED });
        return await this.contractTypesService.findAll(+page, +limit, order);
    }
    async findOne(id) {
        return await this.contractTypesService.findOne(id);
    }
    update(updateContractTypeDto, req) {
        return this.contractTypesService.update(updateContractTypeDto, req.user);
    }
    async remove(id, req) {
        return await this.contractTypesService.remove(id, req.user);
    }
};
exports.ContractTypesController = ContractTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_type_dto_1.CreateContractTypeDto, Object]),
    __metadata("design:returntype", Promise)
], ContractTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ContractTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_type_dto_1.UpdateContractTypeDto, Object]),
    __metadata("design:returntype", void 0)
], ContractTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractTypesController.prototype, "remove", null);
exports.ContractTypesController = ContractTypesController = __decorate([
    (0, common_1.Controller)('contract-types'),
    __metadata("design:paramtypes", [contract_types_service_1.ContractTypesService])
], ContractTypesController);
//# sourceMappingURL=contract_types.controller.js.map