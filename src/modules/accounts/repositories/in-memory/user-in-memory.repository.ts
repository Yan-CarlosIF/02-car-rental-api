import { ICreateUserDTO } from "../../dtos/Icreate-user.dto";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../Iuser.repository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
