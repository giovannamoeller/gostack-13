import {Request, Response} from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointments:Appointment[] = [];

const Appointments = {
    create(req: Request, res: Response) {
        const { provider, date } = req.body;

        const parsedDate = startOfHour(parseISO(date));
        const findAppointmentInSameDate = appointments.find(appointment =>
            isEqual(parsedDate, appointment.date)
        );

        if(findAppointmentInSameDate) return res.status(400).json({ message: 'This appointment is already booked '});

        const appointment = new Appointment(provider, parsedDate);

        appointments.push(appointment);

        return res.json(appointment);
    },

    index(req:Request, res:Response) {
        
    }
}

export default Appointments;