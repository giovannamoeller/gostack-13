import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

class ProviderMonthAvailabilityController {
    public async index (request: Request, response: Response): Promise<Response> {
        
        const { id: provider_id } = request.params;
        const { month, year } = request.query; // sempre vem por string

        const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

        const providers = await listProviderMonthAvailability.execute({ 
            provider_id, 
            month: Number(month), 
            year: Number(year) 
        });

        return response.json(providers);
    }
}

export default ProviderMonthAvailabilityController;