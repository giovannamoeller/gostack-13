import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }
  public execute({ date, provider }: RequestDTO) {
    // todo service tem um único método
    const appointmentDate = startOfHour(date);

    const findAppointment = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointment) throw Error("This appointment is already booked");

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
