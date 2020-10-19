import 'reflect-metadata';

import UpdateUserProfileService from './UpdateUserProfileService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsers: FakeUsersRepository;
let updateUser: UpdateUserProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateUserProfile', () => {
    beforeEach(() => {
        fakeStorageProvider = new FakeStorageProvider();
        fakeUsers = new FakeUsersRepository();
        updateUser = new UpdateUserProfileService(fakeUsers, fakeStorageProvider, fakeHashProvider);
    });

    it("should be able to update profile", async () => {

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })

        const updatedUser = await updateUser.execute({ user_id: user.id, name: 'Giovanna Moeller', email: 'giovanna@gmail.com'});
        
        expect(updatedUser.name).toBe('Giovanna Moeller');
        expect(updatedUser.email).toBe('giovanna@gmail.com');
    });

    it("should not be able to change an email to an existing email", async () => {

        await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });

        const user = await fakeUsers.create({ name: 'Test', email: 'test@example.com', password: '123456' });
        
        await expect(updateUser.execute({ user_id: user.id, name: 'Giovanna Moeller', email: 'johndoe@example.com'})).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update password", async () => {

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })

        const updatedUser = await updateUser.execute({ user_id: user.id, name: 'Giovanna Moeller', email: 'giovanna@gmail.com', old_password: '123456', password: '123123'});
        
        expect(updatedUser.password).toBe('123123');
    });

    it("should be able to update password", async () => {

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })
        
        await expect(updateUser.execute({ user_id: user.id, name: 'Giovanna Moeller', email: 'giovanna@gmail.com', password: '123123'})).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to update password with a wrong old password", async () => {

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' })
        
        await expect(updateUser.execute({ user_id: user.id, name: 'Giovanna Moeller', email: 'giovanna@gmail.com', old_password: 'wrong-password', password: '123123'})).rejects.toBeInstanceOf(AppError);
    });

});