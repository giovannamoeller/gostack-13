import { Router } from 'express';
import Appointments from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.post('/', Appointments.create);

export default appointmentsRouter;