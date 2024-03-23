import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/interfaces/IUser.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(user: IUser): Promise<{
        id: string;
        name: string;
        addressWallet: string;
        email: string;
    }>;
}
export {};
