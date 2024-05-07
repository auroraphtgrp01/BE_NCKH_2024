import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-ignition-ethers'
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19'
  },
  networks: {
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: ['0x89951a4b328ba0263aa6375aaf15257b411b6085040dd8008c9b43444f19fa93']
    }
  },
  typechain: {
    tsNocheck: true,
    dontOverrideCompile: true,
    outDir: 'typechain'
  }
}

export default config
