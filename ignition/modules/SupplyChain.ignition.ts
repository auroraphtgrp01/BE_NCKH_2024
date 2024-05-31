import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
const SupplyChain = buildModule('SupplyChain', (m) => {
  const _user = m.getParameter('_user', ['0x26f974df11e949fceceba0d2d5549c9b8320dc13'])
  const _supplier = m.getParameter('_supplier', '0x4dab4bd141a26347985cf38c98e36b91bebaacf2')
  const _total = m.getParameter('_total', 1)
  const _stages = m.getParameter('_stages', [{ percent: 100, deliveryAt: 1717042023, description: '' }])
  const _privateKey = m.getParameter('_privateKey', 'hello')
  const contract = m.contract('SupplyChain', [_user, _supplier, _total, _stages, _privateKey])
  return {
    contract
  }
})
export default SupplyChain
