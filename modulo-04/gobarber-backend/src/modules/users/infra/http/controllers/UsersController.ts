import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = container.resolve(CreateUserService);
        const user = await createUser.execute({ name, email, password });
        return response.json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
        });

        return response.json(user);
    }
}

export default UsersController;