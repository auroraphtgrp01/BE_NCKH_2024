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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const responseMessage_1 = require("../../constants/responseMessage");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: responseMessage_1.RESPONSE_MESSAGES.NAME_MUST_BE_A_STRING }),
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: responseMessage_1.RESPONSE_MESSAGES.ADDRESS_WALLET_MUST_BE_A_STRING }),
    (0, class_validator_1.MaxLength)(42, { message: responseMessage_1.RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH }),
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    (0, class_validator_1.MinLength)(42, { message: responseMessage_1.RESPONSE_MESSAGES.ADDRESS_WALLET_LENGTH }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "addressWallet", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: responseMessage_1.RESPONSE_MESSAGES.EMAIL_MUST_BE_A_STRING }),
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    (0, class_validator_1.IsEmail)({}, { message: responseMessage_1.RESPONSE_MESSAGES.EMAIL_IS_INVALID }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: responseMessage_1.RESPONSE_MESSAGES.DATEOFBIRTH_MUST_BE_A_DATE }),
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: responseMessage_1.RESPONSE_MESSAGES.FIELD_IS_REQUIRED }),
    (0, class_validator_1.MaxLength)(12),
    (0, class_validator_1.MinLength)(12),
    __metadata("design:type", String)
], CreateUserDto.prototype, "indentifyNumber", void 0);
//# sourceMappingURL=create-user.dto.js.map