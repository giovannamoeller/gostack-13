import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

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
        private userTokenRepository: IUserTokenRepository){}

    public async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) throw new AppError('O token não existe');

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) throw new AppError('Usuário não existe');

        user.password = password;

        await this.usersRepository.save(user);
    }

}

export default ResetPasswordService;