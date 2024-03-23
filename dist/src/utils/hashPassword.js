"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const hashPassword = async (password) => {
    const salt = await (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => {
    const isMatch = (0, bcryptjs_1.compareSync)(password, hashedPassword);
    return isMatch;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=hashPassword.js.map