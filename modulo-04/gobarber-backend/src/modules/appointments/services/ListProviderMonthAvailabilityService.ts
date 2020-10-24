
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { getDaysInMonth, getDate } from 'date-fns';

interface Request {
    provider_id: string;
    month: number;
    year: number;
}

type Response = Array<{ // Array de objetos
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({ provider_id, month, year }: Request): Promise<Response> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            month,
            year
        });

        console.log(appointments);

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1)); // dia e hora não importa aqui

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        )
        
        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: appointmentsInDay.length < 10,
            }
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;