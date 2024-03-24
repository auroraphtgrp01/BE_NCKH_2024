import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPINDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        emailVerifyToken: string;
        forgotPasswordToken: string;
        refreshToken: string;
        userStatus: import(".prisma/client").$Enums.UserStatus;
        roleId: string;
    }>;
    updatePIN(PIN: UpdateUserPINDto, id: string): Promise<{
        deletedAt: Date;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: import(".prisma/client").Prisma.JsonValue;
        updatedBy: import(".prisma/client").Prisma.JsonValue;
        deletedBy: import(".prisma/client").Prisma.JsonValue;
    }>;
    updatePIN(PIN: UpdateUserPINDto, id: string): Promise<{
        deletedAt: Date;
        name: string;
        id: string;
        email: string;
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
    }>;
    findAll(page: string, limit: string, order: 'asc' | 'desc'): Promise<{
        users: {
            deletedAt: Date;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: import(".prisma/client").Prisma.JsonValue;
            updatedBy: import(".prisma/client").Prisma.JsonValue;
            deletedBy: import(".prisma/client").Prisma.JsonValue;
            email: string;
            indentifyNumber: string;
            phoneNumber: string;
            addressWallet: string;
            PIN: string;
            gender: string;
            dateOfBirth: Date;
            emailVerifyToken: string;
            forgotPasswordToken: string;
            refreshToken: string;
            userStatus: import(".prisma/client").$Enums.UserStatus;
            roleId: string;
        }[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
