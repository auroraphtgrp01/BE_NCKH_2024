/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IUser } from 'src/users/interfaces/IUser.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: Request & {
        user: IUser;
    }, res: Response): Promise<any>;
}
