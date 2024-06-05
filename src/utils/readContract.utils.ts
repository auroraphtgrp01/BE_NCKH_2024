import { InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import { resolve } from 'path'

export const readContract = (type: 'disputed | supplyChain'): IContractJSON => {
  try {
    const filePath = {
      supplyChain: resolve(process.cwd(), `artifacts/contracts/SupplyChain.sol/SupplyChain.json`),
      disputed: resolve(process.cwd(), `artifacts/contracts/DisputeSmartContract.sol/DisputeSmartContract.json`)
    }
    const data = fs.readFileSync(filePath[type], 'utf8')
    const jsonData = JSON.parse(data)
    return jsonData
  } catch (error) {
    console.log('Error when reading contract', error)

    throw new InternalServerErrorException('Lỗi khi đọc contract')
  }
}

export interface IContractJSON {
  _format: string
  contractName: string
  sourceName: string
  abi: object[]
  bytecode: string
  deployedBytecode: string
  linkReferences: string
  deployedLinkReferences: string
}
