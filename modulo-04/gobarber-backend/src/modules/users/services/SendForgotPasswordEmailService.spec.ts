import 'reflect-metadata';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';

import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeEmailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send Forgot Password Email', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeEmailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUsersTokenRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUserRepository, fakeEmailProvider, fakeUserTokenRepository);
    })
    it("should be able to recover the password using the email", async () => {
        
        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to recover a non-existing user password", async () => {

        await expect(sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
       
        const generatedToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

        expect(generatedToken).toHaveBeenCalledWith(user.id);
    });
});