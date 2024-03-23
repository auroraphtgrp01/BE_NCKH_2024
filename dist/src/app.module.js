"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const nestjs_prisma_1 = require("nestjs-prisma");
const prisma_extensions_1 = require("./utils/prisma.extensions");
const users_module_1 = require("./users/users.module");
const smart_contracts_module_1 = require("./smart-contracts/smart-contracts.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prisma_1.CustomPrismaModule.forRootAsync({
                name: 'PrismaService',
                useFactory: () => {
                    return prisma_extensions_1.extendedPrismaClient;
                },
                isGlobal: true
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            users_module_1.UsersModule,
            smart_contracts_module_1.SmartContractsModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useFactory: ({ httpAdapter }) => {
                    return new nestjs_prisma_1.PrismaClientExceptionFilter(httpAdapter);
                },
                inject: [core_1.HttpAdapterHost]
            }
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map