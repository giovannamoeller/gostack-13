import { Router } from "express";

import ensureAuthentication from '../../middlewares/ensureAuthentication';
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
profileRouter.use(ensureAuthentication);

const profileController = new ProfileController();

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
