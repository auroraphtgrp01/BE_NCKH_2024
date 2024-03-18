"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
const ContractB = (0, modules_1.buildModule)("ContractB", (m) => {
    const nameA = m.getParameter("nameA", "defaultValueAs");
    const nameB = m.getParameter("nameB", "defaultValueBsdsdsdsdsd");
    const nameC = m.getParameter("nameC", "defaultValueC");
    const nameD = m.getParameter("nameC", "defaultValueC");
    const contract = m.contract("ContractB", [nameA, nameB, nameC, nameD]);
    return { contract };
});
exports.default = ContractB;
//# sourceMappingURL=ContractB.ignition.js.map