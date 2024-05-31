import * as fs from 'fs-extra'
import * as path from 'path'
import { exec } from 'child_process'
import { IStageDeploy } from 'src/interfaces/smart-contract.interface'

export const deployContractIgnition = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const command = `npx hardhat ignition deploy ./ignition/modules/SupplyChain.ignition.ts --network localganache`
    const childProcess = exec(command)
    let outputData = ''

    childProcess.stdout.on('data', (data) => {
      const output = data.toString()
      console.log(output)
      outputData += output
      childProcess.stdin.write('y\n')
    })

    childProcess.on('close', (code) => {
      console.log(`Quá trình đã kết thúc với mã trạng thái ${code}`)
      if (code === 0) {
        resolve(outputData)
      } else {
        reject(new Error(`Quá trình kết thúc với mã trạng thái ${code}`))
      }
    })
    childProcess.on('error', (error) => {
      console.error('Lỗi khi thực thi lệnh:', error)
      reject(error)
    })
  })
}

async function deployContract(
  _supplier: string,
  contractId: string,
  _users: string[],
  _total: number,
  _stages: IStageDeploy[]
): Promise<any> {
  const ignition = `import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";
    const SupplyChain = buildModule("SupplyChain", (m) => {
    const _user = m.getParameter("_user", ${JSON.stringify(_users)});
    const _supplier = m.getParameter("_supplier", ${JSON.stringify(_supplier)});
    const _cid = m.getParameter("_keys", ${JSON.stringify('')});
    const _total = m.getParameter("_total", ${JSON.stringify(_total)});
    const _stages = m.getParameter("_stages", ${JSON.stringify(_stages)});
    const _privateKey = m.getParameter("_privateKey", ${JSON.stringify('hello')});
    const contract = m.contract("SupplyChain", [_user, _supplier, _cid, _total, _stages, _privateKey]);
return {
    contract
}})
export default SupplyChain`

  try {
    const ignitionPath = path.join(process.cwd(), '/ignition/modules', 'SupplyChain.ignition.ts')
    fs.writeFileSync(ignitionPath, ignition)
    await manageDirectoryAndDeploy()
    await refactorArtifacts(contractId)
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function manageDirectoryAndDeploy(): Promise<void> {
  const pathsToDelete = [path.join(process.cwd(), '/ignition/deployments'), path.resolve(process.cwd(), 'typechain')]
  for (const pathToDelete of pathsToDelete) {
    if (await fs.pathExists(pathToDelete)) {
      await fs.remove(pathToDelete)
    }
  }
  await deployContractIgnition()
}

async function refactorArtifacts(contractId: string): Promise<void> {
  const artifactsDir = path.resolve(process.cwd(), 'artifacts/contracts')
  const artifactsPath = path.join(artifactsDir, 'SupplyChain.sol')
  const artifactsPathNew = path.join(artifactsDir, `${contractId}.sol`)

  if (await fs.pathExists(artifactsPath)) {
    await fs.rename(artifactsPath, artifactsPathNew)
  }
  const filesToRename = [
    { oldPath: `SupplyChain.dbg.json`, newPath: `${contractId}.dbg.json` },
    { oldPath: `SupplyChain.json`, newPath: `${contractId}.json` }
  ]
  for (const file of filesToRename) {
    const oldFilePath = path.resolve(artifactsPathNew, file.oldPath)
    const newFilePath = path.resolve(artifactsPathNew, file.newPath)
    if (await fs.pathExists(oldFilePath)) {
      await fs.rename(oldFilePath, newFilePath)
    }
  }
  if (!(await fs.pathExists(path.resolve(process.cwd(), 'artifacts-storage')))) {
    await fs.mkdir(path.resolve(process.cwd(), 'artifacts-storage'))
  }

  const destinationDir = path.resolve(process.cwd(), `artifacts-storage/${contractId}.sol`)
  await fs.copy(artifactsPathNew, destinationDir)
  await fs.remove(artifactsPathNew)
}
export { deployContract }
