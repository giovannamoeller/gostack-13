import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

        const parsedDate = startOfHour(parseISO(date));

        const findAppointment = appointmentsRepository.findByDate(parsedDate);

        if(findAppointment) return res.status(400).json({ message: 'This appointment is already booked '});

        const appointment = appointmentsRepository.create({
            provider, 
            date: parsedDate
        });

        return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
    const appointmentsList = appointmentsRepository.All();
    return res.json(appointmentsList);
});

export default appointmentsRouter;