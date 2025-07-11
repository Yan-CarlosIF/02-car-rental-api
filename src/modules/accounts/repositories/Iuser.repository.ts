import { ICreateUserDTO } from "../dtos/Icreate-user.dto";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
