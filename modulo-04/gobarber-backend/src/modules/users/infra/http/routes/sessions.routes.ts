import { Router } from "express";
import { container } from 'tsyringe';

import CreateSessionService from "@modules/users/services/CreateSessionService";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {

    const { email, password } = req.body;

    const authenticateUser = container.resolve(CreateSessionService);

    const { user, token } = await authenticateUser.execute({ email, password });

    // delete user.password;

    return res.json({ user, token });
    
});

export default sessionsRouter;
