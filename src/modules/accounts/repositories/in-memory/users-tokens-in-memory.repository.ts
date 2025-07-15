import { ICreateUserTokenDTO } from "@modules/accounts/dtos/Icreate-user-token.dto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../Iusers-tokens.repository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    return this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string) {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}
