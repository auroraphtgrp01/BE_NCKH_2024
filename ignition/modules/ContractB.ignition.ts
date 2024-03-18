import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ContractB = buildModule("ContractB", (m) => {
    const nameA = m.getParameter("nameA", "defaultValueAs");
    const nameB = m.getParameter("nameB", "defaultValueBsdsdsdsdsd");
    const nameC = m.getParameter("nameC", "defaultValueC");
    const nameD = m.getParameter("nameC", "defaultValueC");

    const contract = m.contract("ContractB", [nameA, nameB, nameC, nameD]);

    return { contract };
});

export default ContractB;