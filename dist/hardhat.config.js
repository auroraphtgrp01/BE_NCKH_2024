"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
const config = {
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
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map