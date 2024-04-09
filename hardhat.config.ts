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
      accounts: ['0x378ea284d8f6661c558156c7b6b9d8849645959037c2064835dea5fcc2f0ba57']
    }
  },
  typechain: {
    tsNocheck: true,
    dontOverrideCompile: true,
    outDir: 'typechain'
  }
}

export default config
