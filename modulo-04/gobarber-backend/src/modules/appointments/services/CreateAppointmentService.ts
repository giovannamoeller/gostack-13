import { getHours, isBefore, startOfHour } from "date-fns";
import { injectable, inject } from 'tsyringe';


import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';


interface RequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
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


    if(isBefore(appointmentDate, new Date(Date.now()))) {
      throw new AppError(`You can't create an appointment on a past date`);
    }

    const findAppointment = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointment) throw new AppError("This appointment is already booked", 401);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;

  }
}

export default CreateAppointmentService;
