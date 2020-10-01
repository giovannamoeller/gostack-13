import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    constructor(private usersRepository: IUsersRepository){}

    public async execute({ name, email, password }: Request): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists) throw new AppError('Email address already used.', 400);

        const hashPassword = await bcrypt.hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword
        });
        
        return user;
    }

}

export default CreateUserService;