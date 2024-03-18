export declare const readContract: (filePath: string) => IContractJSON;
export interface IContractJSON {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: object[];
    bytecode: string;
    deployedBytecode: string;
    linkReferences: string;
    deployedLinkReferences: string;
}
