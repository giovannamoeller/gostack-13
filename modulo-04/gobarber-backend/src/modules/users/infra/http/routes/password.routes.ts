import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    },
}), forgotPasswordController.create);

passwordRouter.post("/reset", celebrate({
    [Segments.BODY]: {
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')), // o único valor válido para o confirmation é o valor do password
        token: Joi.string().required(),
    },
}), resetPasswordController.create);

export default passwordRouter;
