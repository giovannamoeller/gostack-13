import "reflect-metadata";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeUsers: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: CreateSessionService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe("CreateSession", () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    authenticateUser = new CreateSessionService(fakeUsers, fakeHashProvider);
    createUser = new CreateUserService(fakeUsers, fakeHashProvider, fakeCacheProvider);
  })
  it("should be able to authenticate", async () => {

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user); // garante que os usuários são os mesmos
  });

  it("should be not be able to authenticate with non existing user", async () => {

    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456",
    })).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to authenticate with wrong email or password", async () => {

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "wrong-password",
    })).rejects.toBeInstanceOf(AppError);
  })
});
