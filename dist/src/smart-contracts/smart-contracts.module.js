"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsModule = void 0;
const common_1 = require("@nestjs/common");
const smart_contracts_service_1 = require("./smart-contracts.service");
const smart_contracts_controller_1 = require("./smart-contracts.controller");
let SmartContractsModule = class SmartContractsModule {
};
exports.SmartContractsModule = SmartContractsModule;
exports.SmartContractsModule = SmartContractsModule = __decorate([
    (0, common_1.Module)({
        controllers: [smart_contracts_controller_1.SmartContractsController],
        providers: [smart_contracts_service_1.SmartContractsService],
    })
], SmartContractsModule);
//# sourceMappingURL=smart-contracts.module.js.map