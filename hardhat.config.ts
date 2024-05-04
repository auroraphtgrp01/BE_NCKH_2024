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
      accounts: ['0x68c07302c3d4f841d7ebf3f43fb9ceee76492182d39fbc461b04fef619ca6ef4']
    }
  },
  typechain: {
    tsNocheck: true,
    dontOverrideCompile: true,
    outDir: 'typechain'
  }
}

export default config
