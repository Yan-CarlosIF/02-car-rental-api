import { AppError } from "@shared/errors/app-error";
import { ICreateUserDTO } from "@modules/accounts/dtos/Icreate-user.dto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/user-in-memory.repository";
import { CreateUserUseCase } from "../createUser/create-user.useCase";
import { AuthenticateUserUseCase } from "./authenticate-user.useCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/users-tokens-in-memory.repository";
import { DayjsDateProvider } from "@shared/conteiner/providers/dateProvider/implementations/dayjs-date-provider";

describe("Authenticate User", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let dateProvider: DayjsDateProvider;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
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
