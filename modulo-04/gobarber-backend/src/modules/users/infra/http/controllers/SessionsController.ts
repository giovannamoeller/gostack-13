import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = container.resolve(CreateSessionService);
        const { user, token } = await authenticateUser.execute({ email, password });
        // delete user.password;
        return response.json({ user, token });
    }
}

export default SessionsController;