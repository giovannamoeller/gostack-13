// Persistência <-> Repositório <-> Rotas
import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public All() {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date)
        );

        return findAppointmentInSameDate || null;
    }

    public create({provider, date}: CreateAppointmentDTO) {
        const appointment = new Appointment({
            provider, 
            date
        });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;