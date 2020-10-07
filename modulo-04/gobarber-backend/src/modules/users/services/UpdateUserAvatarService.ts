import User from '../infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface Request {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('StorageProvider')
        private storageProvider: IStorageProvider){}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) throw new AppError('Only authenticated users can change avatar', 401);

        if(user.avatar) {
           await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = fileName;

        await this.usersRepository.save(user); // ele já atualiza automaticamente se existir um usuário

        return user;
    }
}

export default UpdateUserAvatarService;