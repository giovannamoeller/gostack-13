import { Router } from "express";

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthentication';
import AppointmentsController from "../controllers/AppointmentsController";

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();

// Rota: recebe a requisição, chama outro arquivo e devolve uma resposta

/*appointmentsRouter.get("/", async (req, res) => {
  const appointmentsList = await appointmentsRepository.find();

  return res.json(appointmentsList);
});*/

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
