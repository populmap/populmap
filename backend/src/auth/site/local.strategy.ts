import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserSessionDto } from "src/dto/user.session.dto";
import LoginType from "src/enums/login.type.enum";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string, callback: CallableFunction) {
    const userDto = await this.authService.validateSiteUser(username, password);
    if (!userDto) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }
    const user: UserSessionDto = {
      loginType: LoginType.SITE,
      userId: userDto.userId,
      userName: userDto.userName,
      email: userDto.email,
    };
    callback(null, user);
  }
}
