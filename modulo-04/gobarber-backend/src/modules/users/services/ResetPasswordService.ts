import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,){}

    public async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) throw new AppError('O token não existe');

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) throw new AppError('Usuário não existe');

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }

}

export default ResetPasswordService;