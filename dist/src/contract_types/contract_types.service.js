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
exports.ContractTypesService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const responseMessage_1 = require("../constants/responseMessage");
let ContractTypesService = class ContractTypesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createContractTypeDto, user) {
        const createdBy = { id: user.id, name: user.name, email: user.email };
        const contractType = await this.prismaService.client.contractType.create({
            data: {
                name: createContractTypeDto.name,
                description: createContractTypeDto.description,
                createdBy
            }
        });
        return contractType;
    }
    async findAll(page, limit, order) {
        const totalItems = await this.prismaService.client.contractType.count();
        const totalPages = Math.ceil(totalItems / limit);
        const contractTypes = await this.prismaService.client.contractType.findMany({
            where: { deletedAt: null },
            skip: (page - 1) * limit,
            take: limit * 1,
            orderBy: {
                id: order
            }
        });
        return {
            contractTypes,
            totalItems,
            totalPages,
            currentPage: page,
            limit
        };
    }
    async findOne(id) {
        const contractType = await this.prismaService.client.contractType.findUnique({ where: { id, deletedAt: null } });
        return contractType;
    }
    async update(updateContractTypeDto, user) {
        const isContractTypeExists = await this.prismaService.client.contractType.findUnique({
            where: { id: updateContractTypeDto.id, deletedAt: null }
        });
        if (!isContractTypeExists)
            throw new common_1.NotFoundException(responseMessage_1.RESPONSE_MESSAGES.CONTRACT_TYPE_NOT_FOUND_OR_DELETED);
        const updatedBy = { id: user.id, name: user.name, email: user.email };
        const contractType = await this.prismaService.client.contractType.update({
            where: { id: updateContractTypeDto.id },
            data: {
                name: updateContractTypeDto.name,
                description: updateContractTypeDto.description,
                updatedBy
            }
        });
        return contractType;
    }
    async remove(id, user) {
        const deletedBy = { id: user.id, name: user.name, email: user.email };
        const isContractTypeExists = await this.prismaService.client.contractType.findUnique({
            where: { id, deletedAt: null }
        });
        if (!isContractTypeExists)
            throw new common_1.NotFoundException(responseMessage_1.RESPONSE_MESSAGES.CONTRACT_TYPE_NOT_FOUND_OR_DELETED);
        const contractType = await this.prismaService.client.contractType.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy }
        });
        return contractType;
    }
};
exports.ContractTypesService = ContractTypesService;
exports.ContractTypesService = ContractTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PrismaService')),
    __metadata("design:paramtypes", [nestjs_prisma_1.CustomPrismaService])
], ContractTypesService);
//# sourceMappingURL=contract_types.service.js.map