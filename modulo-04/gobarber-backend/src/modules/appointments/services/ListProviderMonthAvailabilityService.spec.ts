import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointments: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointments = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointments);
    });

    it("should be able to list the month availability from provider", async () => {
        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 8, 0, 0) // Ano - mês - dia - hora - minuto - segundos
            // Mês começa em 0!
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 9, 0, 0) // Brasil: UTC-3;
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 10, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 11, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 12, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 13, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 14, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 15, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 16, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 20, 17, 0, 0)
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 3, 20, 10, 0, 0) 
        });

        await fakeAppointments.create({
            provider_id: 'provider-id',
            date: new Date(2021, 4, 21, 10, 0, 0) 
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'provider-id',
            year: 2021,
            month: 5
        });

        // Espero que seja um array e que dentro dela tenha dia 20 e 21 como available false

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true },
            { day: 20, available: false },
            { day: 21, available: true },
            { day: 22, available: true },
        ]));
        
    });
});