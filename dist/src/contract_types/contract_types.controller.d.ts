/// <reference types="cookie-parser" />
import { ContractTypesService } from './contract_types.service';
import { CreateContractTypeDto } from './dto/create-contract_type.dto';
import { UpdateContractTypeDto } from './dto/update-contract_type.dto';
import { Request } from 'express';
import { IUser } from 'src/users/interfaces/IUser.interface';
export declare class ContractTypesController {
    private readonly contractTypesService;
    constructor(contractTypesService: ContractTypesService);
    create(createContractTypeDto: CreateContractTypeDto, req: Request & {
        user: IUser;
    }): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    findAll(page: number, limit: number, order: 'asc' | 'desc'): Promise<{
        contractTypes: {
            deletedAt: Date;
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: import(".prisma/client").Prisma.JsonValue;
            updatedBy: import(".prisma/client").Prisma.JsonValue;
            deletedBy: import(".prisma/client").Prisma.JsonValue;
        }[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    update(updateContractTypeDto: UpdateContractTypeDto, req: Request & {
        user: IUser;
    }): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    remove(id: string, req: Request & {
        user: IUser;
    }): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
}
