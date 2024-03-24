import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "./common";
export interface ContractAInterface extends Interface {
    getFunction(nameOrSignature: "nameA" | "nameB" | "nameC" | "setNameA" | "setNameB" | "setNameC"): FunctionFragment;
    encodeFunctionData(functionFragment: "nameA", values?: undefined): string;
    encodeFunctionData(functionFragment: "nameB", values?: undefined): string;
    encodeFunctionData(functionFragment: "nameC", values?: undefined): string;
    encodeFunctionData(functionFragment: "setNameA", values: [string]): string;
    encodeFunctionData(functionFragment: "setNameB", values: [string]): string;
    encodeFunctionData(functionFragment: "setNameC", values: [string]): string;
    decodeFunctionResult(functionFragment: "nameA", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameC", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameA", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setNameC", data: BytesLike): Result;
}
export interface ContractA extends BaseContract {
    connect(runner?: ContractRunner | null): ContractA;
    waitForDeployment(): Promise<this>;
    interface: ContractAInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    nameA: TypedContractMethod<[], [string], "view">;
    nameB: TypedContractMethod<[], [string], "view">;
    nameC: TypedContractMethod<[], [string], "view">;
    setNameA: TypedContractMethod<[_nameA: string], [void], "nonpayable">;
    setNameB: TypedContractMethod<[_nameB: string], [void], "nonpayable">;
    setNameC: TypedContractMethod<[_nameC: string], [void], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "nameA"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "nameB"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "nameC"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setNameA"): TypedContractMethod<[_nameA: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "setNameB"): TypedContractMethod<[_nameB: string], [void], "nonpayable">;
    getFunction(nameOrSignature: "setNameC"): TypedContractMethod<[_nameC: string], [void], "nonpayable">;
    filters: {};
}
