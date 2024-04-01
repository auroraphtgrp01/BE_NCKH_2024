import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ContractA = buildModule("ContractA", (m) => {
  const nameA = m.getParameter("nameA", "defaultValueAs");
  const nameB = m.getParameter("nameB", "defaultValueBsdsdsdsdsd");
  const nameC = m.getParameter("nameC", "defaultValueC");

  const contract = m.contract("ContractA", [nameA, nameB, nameC]);
  return { contract };
});

export default ContractA;