import * as fs from 'fs-extra';
import * as path from 'path';
import { deployContractIgnition } from 'src/utils/execute.utils';

async function deployContract(_keys: string[], _values: string[], _supplier: string, contractId: string): Promise<void> {
    const ignition = `import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";
    const SupplyChain = buildModule("SupplyChain", (m) => {
    const keys = ${JSON.stringify(_keys)}
    const values = ${JSON.stringify(_values)}
    const _supplier = m.getParameter("_supplier", ${JSON.stringify(_supplier)});
    const _keys = m.getParameter("_keys", keys);
    const _values = m.getParameter("_values", values);
    const contract = m.contract("SupplyChain", [_supplier, _keys, _values])
return {
    contract
}})
export default SupplyChain`;

    const ignitionPath = path.join(process.cwd(), '/ignition/modules', 'SupplyChain.ignition.ts');
    fs.writeFileSync(ignitionPath, ignition);

    await manageDirectoryAndDeploy();
    await refactorArtifacts(contractId);
}

async function manageDirectoryAndDeploy(): Promise<void> {
    const pathsToDelete = [
        path.join(process.cwd(), '/ignition/deployments'),
        path.resolve(process.cwd(), 'typechain')
    ];
    for (const pathToDelete of pathsToDelete) {
        if (await fs.pathExists(pathToDelete)) {
            await fs.remove(pathToDelete);
        }
    }
    await deployContractIgnition();
}

async function refactorArtifacts(contractId: string): Promise<void> {
    const artifactsDir = path.resolve(process.cwd(), 'artifacts/contracts');
    const artifactsPath = path.join(artifactsDir, 'SupplyChain.sol');
    const artifactsPathNew = path.join(artifactsDir, `${contractId}.sol`);

    if (await fs.pathExists(artifactsPath)) {
        await fs.rename(artifactsPath, artifactsPathNew);
    }

    const filesToRename = [
        { oldPath: `SupplyChain.dbg.json`, newPath: `${contractId}.dbg.json` },
        { oldPath: `SupplyChain.json`, newPath: `${contractId}.json` }
    ];
    for (const file of filesToRename) {
        const oldFilePath = path.join(artifactsDir, contractId, file.oldPath);
        const newFilePath = path.join(artifactsDir, contractId, file.newPath);
        if (await fs.pathExists(oldFilePath)) {
            await fs.rename(oldFilePath, newFilePath);
        }
    }

    const destinationDir = path.resolve(process.cwd(), `artifacts-storage/${contractId}.sol`);
    await fs.copy(artifactsPathNew, destinationDir);
    await fs.remove(artifactsPathNew);
}

export { deployContract };
