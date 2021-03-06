import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
import multer from 'multer';
import uploadConfig from '../config/upload';
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);
// single -> upload unico arquivo
// array -> upload de varios arquivos

usersRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    console.log(user)

    return res.json(user);
  
});

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), async (req, res) => {
  
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;
    return res.json(user)
  
});

export default usersRouter;
