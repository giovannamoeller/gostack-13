// Persistência <-> Repositório <-> Rotas
import { uuid } from 'uuidv4';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
        return findAppointment;
    }

    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year)
        );
        return appointments;
    }

    public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year &&
                getDate(appointment.date) === day)
        );
        return appointments;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id }); // pega um objeto e une com outros objetos   
        
        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;