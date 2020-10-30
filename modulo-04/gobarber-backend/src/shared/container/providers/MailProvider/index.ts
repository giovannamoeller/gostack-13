import { container } from  'tsyringe';

import mailConfig from "@config/mail";
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from "../MailProvider/models/IMailProvider";

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    providers[mailConfig.driver] // faz a injeção de dependência,
);