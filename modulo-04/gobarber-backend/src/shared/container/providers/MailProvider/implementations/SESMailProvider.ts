import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
    private client: Transporter
    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01', // é utilizada até hoje
                region: 'us-east-1' // região onde está hospedado o serviço
            }),
        });

    }
    public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject, 
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}