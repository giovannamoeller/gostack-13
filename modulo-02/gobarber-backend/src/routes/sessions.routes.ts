import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateUserService from "../services/CreateUserService";
import CreateSessionService from "../services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {

    const { email, password } = req.body;

    const authenticateUser = new CreateSessionService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
    
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
