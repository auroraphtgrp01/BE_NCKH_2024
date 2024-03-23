import { HttpException } from '@nestjs/common';
import * as fs from 'fs'
import { resolve } from 'path';

export const readContract = (fileName: string): IContractJSON => {
    try {
        const filePath = resolve(process.cwd(), `artifacts/contracts/${fileName}.sol/${fileName}.json`);
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.log('Error when reading contract', error);

        throw new HttpException('Lỗi khi đọc contract', 500)
    }
};

export interface IContractJSON {
    _format: string;
    contractName: string
    sourceName: string
    abi: object[]
    bytecode: string
    deployedBytecode: string
    linkReferences: string
    deployedLinkReferences: string

}