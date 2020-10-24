interface IMailConfig {
    driver: 'ethereal' | 'ses',
    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: '', // qual email você tem configurado lá no SES
            name: 'Giovanna Moeller'
        }
    }
} as IMailConfig // garante que o driver tenha apenas essas 2 opções