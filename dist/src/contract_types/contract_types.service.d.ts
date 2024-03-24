import { CreateContractTypeDto } from './dto/create-contract_type.dto';
import { UpdateContractTypeDto } from './dto/update-contract_type.dto';
import { IUser } from 'src/users/interfaces/IUser.interface';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions';
export declare class ContractTypesService {
    private readonly prismaService;
    constructor(prismaService: CustomPrismaService<ExtendedPrismaClient>);
    create(createContractTypeDto: CreateContractTypeDto, user: IUser): Promise<{
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
    update(updateContractTypeDto: UpdateContractTypeDto, user: IUser): Promise<{
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
    remove(id: string, user: IUser): Promise<{
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
