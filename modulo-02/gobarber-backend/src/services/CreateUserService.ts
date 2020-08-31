import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({ where: {email} });


        if(checkUserExists) throw new Error('Email address already used.');

        const hashPassword = await bcrypt.hash(password, 8)

        const user = await userRepository.create({
            name,
            email,
            password: hashPassword
        });

        
        await userRepository.save(user);
        
        delete user.password;
        
        return user;
    }

}

export default CreateUserService;