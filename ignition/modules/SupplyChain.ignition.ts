import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
const SupplyChain = buildModule('SupplyChain', (m) => {
  const _user = m.getParameter('_user', [
    '0x2B4eD1802A104C3984189327243f075AE6553fFc',
    '0x26f974dF11e949FCecEba0d2d5549C9B8320dc13'
  ])
  const _supplier = m.getParameter('_supplier', '0x69eD52e5C637a9393E0a0F575d5c8F5aeDa045Ea')
  const _cid = m.getParameter('_keys', '')
  const _total = m.getParameter('_total', 5)
  const _stages = m.getParameter('_stages', [])
  const _privateKey = m.getParameter('_privateKey', 'hello')
  const contract = m.contract('SupplyChain', [_user, _supplier, _cid, _total, _stages, _privateKey])
  return {
    contract
  }
})
export default SupplyChain
