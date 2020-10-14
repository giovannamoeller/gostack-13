import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider){}

    public async execute({ email }: Request): Promise<void> {
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }

}

export default SendForgotPasswordEmailService;