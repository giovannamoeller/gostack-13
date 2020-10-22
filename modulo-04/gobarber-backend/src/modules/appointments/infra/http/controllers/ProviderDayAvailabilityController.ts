import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

class ProviderMonthAvailabilityController {
    public async index (request: Request, response: Response): Promise<Response> {
        const { id: provider_id } = request.params;
        const { day, month, year } = request.body;

        const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

        const providers = await listProviderDayAvailability.execute({ provider_id, day, month, year });

        return response.json(providers);
    }
}

export default ProviderMonthAvailabilityController;