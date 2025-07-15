import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/user-in-memory.repository";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/users-tokens-in-memory.repository";
import { DayjsDateProvider } from "@shared/conteiner/providers/dateProvider/implementations/dayjs-date-provider";
import { MailProviderInMemory } from "@shared/conteiner/providers/mailProvider/in-memory/mail-provider-in-memory";
import { AppError } from "@shared/errors/app-error";
import { SendForgottenPasswordMailUseCase } from "./send-forgotten-password-mail.useCase";

describe("Send Forgotten Password Mail", () => {
  let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgotten password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "User Test",
      password: "1234",
      email: "user@example.com",
      driver_license: "123456",
    });

    await sendForgottenPasswordMailUseCase.execute("user@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgottenPasswordMailUseCase.execute("user@example.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateToken = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      name: "User Test",
      password: "1234",
      email: "user@example.com",
      driver_license: "123456",
    });

    await sendForgottenPasswordMailUseCase.execute("user@example.com");

    expect(generateToken).toHaveBeenCalled();
  });
});
