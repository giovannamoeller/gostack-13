import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer'; //Pega 1+ classes(entidades) e vai aplicar os métodos Exclude, Expose

import CreateSessionService from '@modules/users/services/CreateSessionService';

class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = container.resolve(CreateSessionService);
        const { user, token } = await authenticateUser.execute({ email, password });
        return response.json({ user: classToClass(user), token });
    }
}

export default SessionsController;