import { Router } from "express";
import multer from 'multer';

import uploadConfig from '../../../../../config/upload';
import ensureAuthentication from '../../middlewares/ensureAuthentication';
import UserAvatarController from "../controllers/UserAvatarController";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
// single -> upload unico arquivo
// array -> upload de varios arquivos

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
