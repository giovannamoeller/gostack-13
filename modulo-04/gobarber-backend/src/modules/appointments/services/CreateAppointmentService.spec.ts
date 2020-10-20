import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointments: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointments = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(fakeAppointments);
    });

    it("should be able to create a new appointment", async () => {
        const appointment = await createAppointment.execute({ date: new Date(), provider_id: 'provider-id', user_id: 'user-id'});
        expect(appointment).toHaveProperty('id');
        // ou: expect(appointment.provider_id).toBe('48594940303');
    });

    it("should not be able to create two appointments on the same time", async () => {
        const appointmentDate = new Date(2020, 4, 10, 11); 
        await createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id'});
        await expect(createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id'}))
            .rejects.toBeInstanceOf(AppError)
    });
});