import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const SupplyChain = buildModule("SupplyChain", (m) => {
    const keys = ["partyNameA", "partyNameB", "partyNameC", "AddressWallet", "email", "phoneNumber"]
    const values = ["Le Minh Tuan", "Tran Nguyen Duy Khanh", "Nguyen Quang Huy", "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea", "minhtuanledng@gmail.com", "0123123123"]
    const _supplier = m.getParameter("_supplier", "0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea");
    const _keys = m.getParameter("_keys", keys);
    const _values = m.getParameter("_values", values);
    const contract = m.contract("SupplyChain", [_supplier, _keys, _values])
    return {
        contract
    }
})
export default SupplyChain