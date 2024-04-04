import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers"
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
  },
  networks: {
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: ["0xe12c03915e004c21df36642dd196f17faaf428fcc6338ab76d6ce3243c14403a"],
    },
  },
  typechain: {
    tsNocheck: true,
    dontOverrideCompile: true,
    outDir: "typechain",
  },

};

export default config;
