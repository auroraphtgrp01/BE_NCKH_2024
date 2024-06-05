import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
const SupplyChain = buildModule('SupplyChain', (m) => {
  const _user = m.getParameter('_user', ['0x71dAAfD4ef982d68B1b9BEa7236a15C81b4DFDEB'])
  const _supplier = m.getParameter('_supplier', '0x7845f9460e23Ed7f3E5fb347453EF6029cCe6C52')
  const _total = m.getParameter('_total', 1)
  const _stages = m.getParameter('_stages', [{ percent: 100, deliveryAt: 1717042023, description: '' }])
  const _privateKey = m.getParameter('_privateKey', '123')
  const contract = m.contract('SupplyChain', [_user, _supplier, _total, _stages, _privateKey])
  return {
    contract
  }
})
export default SupplyChain
