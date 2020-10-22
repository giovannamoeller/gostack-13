
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface Request {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
    
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({ provider_id, day, month, year }: Request): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id, day, month, year
        });

        return appointments;
    }
}

export default ListProviderMonthAvailabilityService;