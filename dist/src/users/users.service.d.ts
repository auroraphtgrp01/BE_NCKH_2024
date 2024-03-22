import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: CustomPrismaService<ExtendedPrismaClient>);
    create(createUserDto: CreateUserDto): Promise<{
        deletedAt: Date;
        id: string;
        email: string;
        name: string;
        phoneNumber: string;
        indentifyNumber: string;
        addressWallet: string;
        gender: string;
        dateOfBirth: Date;
        PIN: string;
        emailVerifyToken: string;
        forgotPasswordToken: string;
        refreshToken: string;
        userStatus: import(".prisma/client").$Enums.UserStatus;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    updatePIN(updateUserPINDto: UpdateUserPINDto, id: string): Promise<{
        deletedAt: Date;
        id: string;
        email: string;
        name: string;
        phoneNumber: string;
        indentifyNumber: string;
        addressWallet: string;
        gender: string;
        dateOfBirth: Date;
        PIN: string;
        emailVerifyToken: string;
        forgotPasswordToken: string;
        refreshToken: string;
        userStatus: import(".prisma/client").$Enums.UserStatus;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    getABI(): object[];
}
