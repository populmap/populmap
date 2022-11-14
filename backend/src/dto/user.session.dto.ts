import { UserDto } from "./user.dto";

export class UserSessionDto extends UserDto {
  access_token: string;
}
