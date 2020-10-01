import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";

import AppError from '@shared/errors/AppError';


interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // todo service tem um único método
    const appointmentDate = startOfHour(date);

    const findAppointment = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointment) throw new AppError("This appointment is already booked", 401);

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
