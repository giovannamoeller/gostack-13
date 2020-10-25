import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsers: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;


describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsers = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviders = new ListProvidersService(fakeUsers, fakeCacheProvider);
    });

    it("should be able to list providers except the one that is authenticate", async () => {

        const user1 = await fakeUsers.create({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });
        const user2 = await fakeUsers.create({ name: 'John Tre', email: 'johntre@example.com', password: '123456' });

        const loggedUser = await fakeUsers.create({ name: 'John Qua', email: 'johnqua@example.com', password: '123456' });
        
        const providers = await listProviders.execute({user_id: loggedUser.id});
        
        expect(providers).toEqual([ // compara as duas variáveis
            user1, user2
        ]);
    });
});