import { HttpException } from '@nestjs/common';
import * as fs from 'fs'

export const readContract = (filePath: string): IContractJSON => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
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