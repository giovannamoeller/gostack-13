import CreateUserService from "./CreateUserService";
import { getRepository } from 'typeorm';
import bcrypt, { compare } from 'bcrypt';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}


class CreateSessionService {
    
    public async execute({ email, password }: Request): Promise<{ user: User }> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email }
        });

        if(!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) throw new Error('Incorrect email/password combination.');

        // Usuário autenticado

        return { user,  }
    }
}

export default CreateSessionService;   