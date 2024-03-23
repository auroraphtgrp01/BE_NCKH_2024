import { UsersService } from '../users/users.service';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/utils/prisma.extensions';
import { IUser } from 'src/users/interfaces/IUser.interface';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prismaService;
    private usersService;
    private jwtService;
    private configService;
    constructor(prismaService: CustomPrismaService<ExtendedPrismaClient>, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    login(user: IUser, res: Response): Promise<any>;
    createAccessToken(user: IUser): string;
    createRefreshToken(user: IUser): string;
    validateUser(username: string, password: string): Promise<any>;
}
