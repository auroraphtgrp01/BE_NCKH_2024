"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
const config = {
    solidity: "0.8.24",
    networks: {
        localganache: {
            url: 'HTTP://127.0.0.1:7545',
            accounts: ["0x2e0fa3c320e9518ac5c2ef28aaf7565363bca327aac30f760bdfd380810a7594"],
        },
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map