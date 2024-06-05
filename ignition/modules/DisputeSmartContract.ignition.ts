import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
const DisputeSmartContract = buildModule('DisputeSmartContract', (m) => {
  const _user = m.getParameter('_user', '0x71dAAfD4ef982d68B1b9BEa7236a15C81b4DFDEB')
  const _supplier = m.getParameter('_supplier', '0x7845f9460e23Ed7f3E5fb347453EF6029cCe6C52')
  const contract = m.contract('DisputeSmartContract', [_user, _supplier])
  return {
    contract
  }
})
export default DisputeSmartContract
