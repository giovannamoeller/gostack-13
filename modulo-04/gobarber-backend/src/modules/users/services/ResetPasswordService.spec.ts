import 'reflect-metadata';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Reset Password', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider);
    })
    it("should be able to reset password", async () => {
        
        let user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generatedHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token,
            password: '123123'
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generatedHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset password with non-existing token', async () => {
        expect(resetPasswordService.execute({token: 'non-existing', password: '123456'})).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-existing user', async () => {
        const { token } = await fakeUserTokenRepository.generate('non-existing-user');
        expect(resetPasswordService.execute({token, password: '123456'})).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password after 2 hours (token expired)', async () => {

        let user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        // Executar o expect duas horas depois

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });
        // mockImplementation -> passa uma função que será chamada em vez da Date.now();
        // mockImplementationOnce -> passa uma função que será chamada em vez da Date.now(), mas apenas a 1a vez!;

        await expect(resetPasswordService.execute({
            token,
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });
});