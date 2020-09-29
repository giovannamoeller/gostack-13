import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';


interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing!', 401);
    }

    // authHeader retorna: Bearer token

    const [, token] = authHeader.split(' ');

    const { secret } = authConfig.jwt;

    
    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload; // força que o decoded é do tipo TokenPayload

        req.user = {
            id: sub
        }; // o express não possui o user dentro do request

        return next();
        
    } catch (err) {
        throw new AppError('Invalid JWT Token', 401);
    }

}