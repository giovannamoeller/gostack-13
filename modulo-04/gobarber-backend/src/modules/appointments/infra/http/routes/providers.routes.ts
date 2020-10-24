import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

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
providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), providerDayAvailabilityController.index);


export default providersRouter;
