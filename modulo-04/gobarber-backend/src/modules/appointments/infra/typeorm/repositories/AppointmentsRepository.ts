// Persistência <-> Repositório <-> Rotas
import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment) // a função cria nosso repositório
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = await this.ormRepository.findOne({
            where: { date: date }, 
        });

        return findAppointment || undefined;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = await this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        // se a minha string não tiver 2 dígitos, eu quero que preencha os dígitos a esquerda com 0.
        
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`) // RAW - passa para o banco sem nenhuma tratativa
                    // to_char = converte para string
            },
        });

        await this.ormRepository.save(appointments);

        return appointments;
    }

    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');
        
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
            },
        });

        await this.ormRepository.save(appointments);

        return appointments;
    }
}

export default AppointmentsRepository;