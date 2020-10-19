import 'reflect-metadata';

import UpdateUserProfileService from './UpdateUserProfileService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsers: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsers = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsers);
    });

    it("should be able to show profile", async () => {

        const user = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });

        const profile = await showProfile.execute({user_id: user.id});
        
        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@example.com');
    });

    it("should not be able to show profile from a non-existing user", async () => {
        await expect(showProfile.execute({user_id: 'non-existing-id'})).rejects.toBeInstanceOf(AppError);
    });
    
});