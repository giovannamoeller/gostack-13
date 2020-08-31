import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT Token is missing!');
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
        throw new Error('Invalid JWT Token');
    }

}