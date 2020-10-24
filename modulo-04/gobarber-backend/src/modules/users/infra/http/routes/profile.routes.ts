import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '../../middlewares/ensureAuthentication';
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
profileRouter.use(ensureAuthentication);

const profileController = new ProfileController();

profileRouter.put('/', celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(), // só é obrigatório quando tiver o old_password
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}), profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
