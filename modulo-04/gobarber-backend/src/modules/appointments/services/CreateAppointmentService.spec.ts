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

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({ date: new Date(2020, 4, 10, 13), provider_id: 'provider-id', user_id: 'user-id'});
        expect(appointment).toHaveProperty('id');
        // ou: expect(appointment.provider_id).toBe('48594940303');
    });

    it("should not be able to create two appointments on the same time", async () => {
        const appointmentDate = new Date(2021, 7, 10, 13); 
        await createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id'});
        await expect(createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id'}))
            .rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create an appointment on a past date", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({ date: new Date(2020, 4, 10, 11), provider_id: 'provider-id', user_id: 'user-id'}))
            .rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment with same user as provider", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider-id',
            user_id: 'provider-id',
        })).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment before 8AM and after 6PM", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 7),
            provider_id: 'provider-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(AppError);

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 18),
            provider_id: 'provider-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(AppError);
    });

});