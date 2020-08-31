import CreateUserService from "./CreateUserService";
import { getRepository } from 'typeorm';
import bcrypt, { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';


import User from '../models/User';

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
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) throw new Error('Incorrect email/password combination.');

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });


        // Usuário autenticado

        return { user,  token}
    }
}

export default CreateSessionService;   