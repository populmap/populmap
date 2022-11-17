import { UserDto } from "./user.dto";

export class UserValidateDto extends UserDto {
  password: string;
}
