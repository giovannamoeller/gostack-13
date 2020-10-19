import { Router } from "express";

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthentication';
import ProvidersControllers from "../controllers/ProvidersControllers";

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const providersControllers = new ProvidersControllers();

providersRouter.get('/', providersControllers.index);

export default providersRouter;
