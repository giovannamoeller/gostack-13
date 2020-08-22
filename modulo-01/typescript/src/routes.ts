import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
    const user = createUser({
        name: 'Giovanna',
        email: 'giovannamoeller@gmail.com',
        password: '123456',
        techs: [
            'NodeJS',
            'ReactJS',
            'ReactNative',
            { title: 'JS', salary: 4800, year: 2 }
        ]
    });
    return res.json({ user })
}