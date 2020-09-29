import { Router } from "express";

import AppointmentsRepository from "../../../../modules/appointments/repositories/AppointmentsRepository";
import CreateUserService from "../../../../modules/users/services/CreateUserService";
import CreateSessionService from "../../../../modules/users/services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {

    const { email, password } = req.body;

    const authenticateUser = new CreateSessionService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
    
});

export default sessionsRouter;
