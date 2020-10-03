import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
    it("should be able to create a new user", async () => {
        const fakeUsers = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsers);

        const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
        expect(user).toHaveProperty('id');
    });

    it("should not be able to create a new user with same email from another", async () => {
        const fakeUsers = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsers);

        await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
        expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'}))
            .rejects.toBeInstanceOf(AppError);
    });

});