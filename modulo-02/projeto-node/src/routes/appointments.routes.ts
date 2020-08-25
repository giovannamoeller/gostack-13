import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// Rota: recebe a requisição, chama outro arquivo e devolve uma resposta

appointmentsRouter.get("/", (req, res) => {
  const appointmentsList = appointmentsRepository.All();

  return res.json(appointmentsList);
});

appointmentsRouter.post("/", (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const appointment = new CreateAppointmentService(
      appointmentsRepository
    ).execute({ provider, date: parsedDate });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
