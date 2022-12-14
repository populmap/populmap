import LoginType from 'src/enums/login.type.enum';
import SocialType from 'src/enums/social.type.enum';
import { UserDto } from './user.dto';

export class UserSessionDto extends UserDto {
  loginType: LoginType;
  socialType?: SocialType;
  socialUserId?: string;
  accessToken?: string;
  iat?: number;
  ext?: number;
}
