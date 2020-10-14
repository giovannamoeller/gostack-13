import 'reflect-metadata';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';

import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('Send Forgot Password Email', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUsersTokenRepository();
        resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository);
    })
    it("should be able to reset password", async () => {
        
        let user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        await resetPasswordService.execute({
            token,
            password: '123123'
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});