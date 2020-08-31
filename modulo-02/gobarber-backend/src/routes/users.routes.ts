import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
import multer from 'multer';
import uploadConfig from '../config/upload';
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateUserService from "../services/CreateUserService";
import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);
// single -> upload unico arquivo
// array -> upload de varios arquivos

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    console.log(user)

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), async (req, res) => {
  console.log(req.file)
  return res.json({ok: true})
});

export default usersRouter;
