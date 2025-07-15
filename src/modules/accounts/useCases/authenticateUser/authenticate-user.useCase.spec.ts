import { AppError } from "@shared/errors/app-error";
import { ICreateUserDTO } from "@modules/accounts/dtos/Icreate-user.dto";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "../createUser/create-user.useCase";
import { AuthenticateUserUseCase } from "./authenticate-user.useCase";

describe("Authenticate User", () => {
  let usersRepositoryInMemory: UserRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      password: "1234",
      email: "user@example.com",
      driver_license: "123456",
    };

    await createUserUseCase.execute({ ...user });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "notExistantEmail",
        password: "randomPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("Should not be able to authenticate with incorrect credentials", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      password: "1234",
      email: "user@example.com",
      driver_license: "123456",
    };

    await createUserUseCase.execute({ ...user });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
