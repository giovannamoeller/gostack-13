import "reflect-metadata";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateSession", () => {
  it("should be able to authenticate", async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new CreateSessionService(fakeUsers, fakeHashProvider);

    const createUser = new CreateUserService(fakeUsers, fakeHashProvider);

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
});
