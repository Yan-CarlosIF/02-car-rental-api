import { User } from "../infra/typeorm/entities/User";

type UserOmit = Omit<User, "password" | "isAdmin" | "created_at">;

export interface IUserReponseDTO extends UserOmit {}
