import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider){}

    public async execute({ email, password }: Request): Promise<{ user: User, token: string }> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

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