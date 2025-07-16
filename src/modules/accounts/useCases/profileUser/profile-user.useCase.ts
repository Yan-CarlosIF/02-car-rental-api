import { UserMap } from "@modules/accounts/mapper/user-map";
import { IUsersRepository } from "@modules/accounts/repositories/Iuser.repository";
import { AppError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    return UserMap.toDTO(user);
  }
}
