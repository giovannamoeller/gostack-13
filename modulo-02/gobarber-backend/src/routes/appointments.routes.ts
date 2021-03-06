import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticated from '../middlewares/ensureAuthentication';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// Rota: recebe a requisição, chama outro arquivo e devolve uma resposta

appointmentsRouter.get("/", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointmentsList = await appointmentsRepository.find();

  return res.json(appointmentsList);
});

appointmentsRouter.post("/", async (req, res) => {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
    return res.json(appointment);

});

export default appointmentsRouter;
