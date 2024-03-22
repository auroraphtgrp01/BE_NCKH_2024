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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPINDto = exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("class-validator");
const responseMessage_1 = require("../../constants/responseMessage");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserPINDto {
}
exports.UpdateUserPINDto = UpdateUserPINDto;
__decorate([
    (0, class_validator_1.MaxLength)(6, { message: responseMessage_1.RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT }),
    (0, class_validator_1.MinLength)(6, { message: responseMessage_1.RESPONSE_MESSAGES.PIN_LENGTH_IS_6_DIGIT }),
    (0, class_validator_1.IsNumberString)({}, { message: responseMessage_1.RESPONSE_MESSAGES.PIN_IS_NUMBER }),
    __metadata("design:type", String)
], UpdateUserPINDto.prototype, "PIN", void 0);
//# sourceMappingURL=update-user.dto.js.map