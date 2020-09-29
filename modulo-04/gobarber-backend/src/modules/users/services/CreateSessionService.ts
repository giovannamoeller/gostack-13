import { getRepository } from 'typeorm';
import bcrypt, { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';


import User from '../infra/typeorm/entities/User';

interface Request {
    email: string;
    password: string;
}


class CreateSessionService {
    
    public async execute({ email, password }: Request): Promise<{ user: User, token: string }> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email }
        });

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) throw new AppError('Incorrect email/password combination.', 401);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        // Usuário autenticado

        return { user, token}
    }
}

export default CreateSessionService;   