import { UserDto } from "src/dto/user.dto";

export interface IAuthRepository {

  /**
   *
   * @param user
   */
  addUserIfNotExists(user: UserDto): Promise<boolean>;
}
