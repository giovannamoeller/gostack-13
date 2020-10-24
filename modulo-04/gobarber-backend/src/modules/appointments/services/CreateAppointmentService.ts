import { getHours, isBefore, startOfHour, format } from "date-fns";
import { injectable, inject } from 'tsyringe';


import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";


interface RequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ date, provider_id, user_id }: RequestDTO): Promise<Appointment> {

    // todo service tem um único método

    if(provider_id === user_id) {
      throw new AppError(`You can't create an appointment with yourself.`);
    }

    const appointmentDate = startOfHour(date);
    // 11:00 -> 11:41 (ele vai cair no erro de hora passada)

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(`You can only create appointments between 8AM and 6PM`);
    }


    if(isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create an appointment on a past date`);
    }

    const findAppointment = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointment) throw new AppError("This appointment is already booked", 401);

    console.log(appointmentDate);
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
        recipient_id: provider_id,
        content: `Novo agendamento para dia: ${formattedDate} `});

    return appointment;

  }
}

export default CreateAppointmentService;
