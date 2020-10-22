import { Router } from "express";

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthentication';
import ProvidersControllers from "../controllers/ProvidersControllers";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const providersControllers = new ProvidersControllers();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.get('/', providersControllers.index);
providersRouter.post('/:id/month-availability', providerMonthAvailabilityController.index);
providersRouter.post('/:id/day-availability', providerDayAvailabilityController.index);


export default providersRouter;
