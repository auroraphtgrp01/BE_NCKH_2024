"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
const ContractA = (0, modules_1.buildModule)("ContractA", (m) => {
    const nameA = m.getParameter("nameA", "defaultValueAs");
    const nameB = m.getParameter("nameB", "defaultValueBsdsdsdsdsd");
    const nameC = m.getParameter("nameC", "defaultValueC");
    const contract = m.contract("ContractA", [nameA, nameB, nameC]);
    return { contract };
});
exports.default = ContractA;
//# sourceMappingURL=ContractA.ignition.js.map