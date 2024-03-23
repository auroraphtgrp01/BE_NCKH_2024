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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const responseMessage_1 = require("../constants/responseMessage");
const readContract_utils_1 = require("../utils/readContract.utils");
const hashPassword_1 = require("../utils/hashPassword");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        const isUserExist = await this.prismaService.client.user.findFirst({
            where: {
                OR: [
                    { email: createUserDto.email },
                    { addressWallet: createUserDto.addressWallet },
                    { indentifyNumber: createUserDto.indentifyNumber }
                ]
            }
        });
        if (isUserExist) {
            throw new common_1.HttpException({ message: responseMessage_1.RESPONSE_MESSAGES.USER_IS_EXIST }, 400);
        }
        return await this.prismaService.client.user.create({
            data: {
                ...createUserDto,
            }
        });
    }
    async updatePIN(updateUserPINDto, id) {
        const hashPIN = await (0, hashPassword_1.hashPassword)(updateUserPINDto.PIN);
        return await this.prismaService.client.user.update({
            where: {
                id
            },
            data: {
                PIN: hashPIN
            }
        });
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    getABI() {
        const filePath = 'artifacts/contracts/ContractA.sol/ContractA.json';
        return (0, readContract_utils_1.readContract)(filePath).abi;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PrismaService')),
    __metadata("design:paramtypes", [nestjs_prisma_1.CustomPrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map