import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: CustomPrismaService<ExtendedPrismaClient>);
    create(createUserDto: CreateUserDto): Promise<object[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    getABI(): object[];
}
