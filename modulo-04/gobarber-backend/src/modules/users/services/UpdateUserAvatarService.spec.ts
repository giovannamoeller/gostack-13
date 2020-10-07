import 'reflect-metadata';

import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';


describe('UpdateUserAvatar', () => {
    it("should be able to update an avatar", async () => {
        const fakeStorageProvider = new FakeStorageProvider();
        const fakeUsers = new FakeUsersRepository();
        const updateUser = new UpdateUserAvatarService(fakeUsers, fakeStorageProvider);

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })

        await updateUser.execute({ user_id: user.id, avatarFileName: 'avatar.png'});
        
        expect(user.avatar).toBe('avatar.png');
    });

    it("should not be able to update an avatar from non existing user", async () => {
        const fakeStorageProvider = new FakeStorageProvider();
        const fakeUsers = new FakeUsersRepository();
        const updateUser = new UpdateUserAvatarService(fakeUsers, fakeStorageProvider);
        
        expect(updateUser.execute({ user_id: 'non-existing-user', avatarFileName: 'avatar.png'}))
            .rejects.toBeInstanceOf(AppError);
    });

    it("should be able to delete an old avatar when updating a new one", async () => {
        const fakeStorageProvider = new FakeStorageProvider();
        const fakeUsers = new FakeUsersRepository();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUser = new UpdateUserAvatarService(fakeUsers, fakeStorageProvider);

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })

        await updateUser.execute({ user_id: user.id, avatarFileName: 'avatar.png'});
        
        await updateUser.execute({ user_id: user.id, avatarFileName: 'avatar2.png'});
        
        expect(deleteFile).toHaveBeenCalledWith('avatar.png'); // o método foi chamado com essa string
        
        expect(user.avatar).toBe('avatar2.png');
    });

});