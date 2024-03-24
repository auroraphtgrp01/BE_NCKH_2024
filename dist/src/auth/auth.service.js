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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const nestjs_prisma_1 = require("nestjs-prisma");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const convert_1 = require("convert");
let AuthService = class AuthService {
    constructor(prismaService, usersService, jwtService, configService) {
        this.prismaService = prismaService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(user, res) {
        const refresh_token = this.createRefreshToken(user);
        res.cookie('refresh_token', refresh_token, {
            maxAge: (0, convert_1.convertMany)(this.configService.get('JWT_REFRESH_EXPIRE_IN')).to('ms'),
            httpOnly: true
        });
        await this.prismaService.client.user.update({
            where: { id: user.id },
            data: { refreshToken: refresh_token }
        });
        return {
            access_token: this.createAccessToken(user),
            refresh_token,
            id: user.id,
            name: user.name,
            addressWallet: user.addressWallet,
            email: user.email
        };
    }
    createAccessToken(user) {
        const payload = {
            sub: 'Access Token',
            iss: 'From Server',
            id: user.id,
            addressWallet: user.addressWallet,
            email: user.email,
            name: user.name
        };
        return this.jwtService.sign(payload);
    }
    createRefreshToken(user) {
        const payload = {
            sub: 'Refresh Token',
            iss: 'From Server',
            id: user.id,
            addressWallet: user.addressWallet,
            email: user.email,
            name: user.name
        };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRE_IN')
        });
    }
    async validateUser(addressWallet, password) {
        const user = await this.usersService.findOneByAddressWallet(addressWallet);
        if (user && user.PIN === password) {
            const { PIN, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PrismaService')),
    __metadata("design:paramtypes", [nestjs_prisma_1.CustomPrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map