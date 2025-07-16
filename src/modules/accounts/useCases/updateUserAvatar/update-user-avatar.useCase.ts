import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/Iuser.repository";
import { AppError } from "@shared/errors/app-error";
import { IStorageProvider } from "@shared/conteiner/providers/storageProvider/Istorage-provider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    
    if (!user) {
      throw new AppError("User does not exists!");
    }
    
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");
    
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
