import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import ListProviderDayAvailabilityService from './ListProviderDayAvailability';

let fakeAppointments: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointments = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointments);
    });

    it("should be able to list the day availability from provider", async () => {
        await fakeAppointments.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2021, 4, 20, 14, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2021, 4, 20, 15, 0, 0)
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'provider-id',
            day: 20,
            year: 2021,
            month: 5,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]));
        
    });
});