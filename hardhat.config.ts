import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers"
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: ["0x2e0fa3c320e9518ac5c2ef28aaf7565363bca327aac30f760bdfd380810a7594"],
    },
  },
};

export default config;
