import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError'

describe('CreateAppointment', () => {
    it("should be able to create a new appointment", async () => {
        const fakeAppointments = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointments);

        const appointment = await createAppointment.execute({ date: new Date(), provider_id: '48594940303'});
        expect(appointment).toHaveProperty('id');
        // ou: expect(appointment.provider_id).toBe('48594940303');
    });

    it("should not be able to create two appointments on the same time", async () => {
        const fakeAppointments = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointments);

        const appointmentDate = new Date(2020, 4, 10, 11); 

        await createAppointment.execute({ date: appointmentDate, provider_id: '48594940303'});
        await expect(createAppointment.execute({ date: appointmentDate, provider_id: '48594940303'}))
            .rejects.toBeInstanceOf(AppError)
    });
});