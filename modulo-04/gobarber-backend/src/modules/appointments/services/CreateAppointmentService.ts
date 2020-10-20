import { startOfHour } from "date-fns";
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
    const appointmentDate = startOfHour(date);

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
