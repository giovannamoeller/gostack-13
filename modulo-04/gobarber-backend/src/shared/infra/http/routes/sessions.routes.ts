import { Router } from "express";

import CreateSessionService from "@modules/users/services/CreateSessionService";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

const sessionsRouter = Router();
const usersRepository = new UsersRepository();

sessionsRouter.post("/", async (req, res) => {

    const { email, password } = req.body;

    const authenticateUser = new CreateSessionService(usersRepository);

    const { user, token } = await authenticateUser.execute({ email, password });

    // delete user.password;

    return res.json({ user, token });
    
});

export default sessionsRouter;
