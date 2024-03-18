"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSmartContractDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_smart_contract_dto_1 = require("./create-smart-contract.dto");
class UpdateSmartContractDto extends (0, mapped_types_1.PartialType)(create_smart_contract_dto_1.CreateSmartContractDto) {
}
exports.UpdateSmartContractDto = UpdateSmartContractDto;
//# sourceMappingURL=update-smart-contract.dto.js.map