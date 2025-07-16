import { classToClass } from "class-transformer";
import { IUserReponseDTO } from "../dtos/Iuser-response.dto";

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: IUserReponseDTO) {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
