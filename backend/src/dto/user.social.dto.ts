import SocialType from "src/enums/social.type.enum";
import { UserDto } from "./user.dto";

export class UserSocialDto {
  email?: string;
  socialType: SocialType;
  accessToken: string;
}
