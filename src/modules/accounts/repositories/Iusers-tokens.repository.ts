import { ICreateUserTokenDTO } from "../dtos/Icreate-user-token.dto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}
