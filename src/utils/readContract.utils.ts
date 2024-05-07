import { InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import { resolve } from 'path'

export const readContract = (fileName: string): IContractJSON => {
  try {
    const filePath = resolve(process.cwd(), `artifacts-storage/${fileName}.sol/${fileName}.json`)
    const data = fs.readFileSync(filePath, 'utf8')
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
