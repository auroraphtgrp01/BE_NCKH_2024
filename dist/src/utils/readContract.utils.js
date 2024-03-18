"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readContract = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const readContract = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }
    catch (error) {
        throw new common_1.HttpException('Lỗi khi đọc contract', 500);
    }
};
exports.readContract = readContract;
//# sourceMappingURL=readContract.utils.js.map