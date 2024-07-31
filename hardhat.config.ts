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
      accounts: ['0x2ad77ad7026360cc5836893cdfd3aa4354224b8220c98b995c77324f87d8b4fa']
    }
  },
  typechain: {
    tsNocheck: true,
    dontOverrideCompile: true,
    outDir: 'typechain'
  }
}

export default config
