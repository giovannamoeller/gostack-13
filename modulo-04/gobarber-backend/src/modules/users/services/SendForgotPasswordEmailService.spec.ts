import 'reflect-metadata';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('Send Forgot Password Email', () => {
    it("should be able to recover the password using the email", async () => {
        const fakeUsers = new FakeUsersRepository();
        const fakeEmailProvider = new FakeMailProvider();
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsers, fakeEmailProvider);

        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

        await fakeUsers.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

        expect(sendMail).toHaveBeenCalled();
    });
});