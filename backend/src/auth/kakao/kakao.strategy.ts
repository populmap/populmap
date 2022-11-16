import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UserSessionDto } from 'src/dto/user.session.dto';
import LoginType from 'src/enums/login.type.enum';
import SocialType from 'src/enums/social.type.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('kakao.clientID'),
      clientSecret: configService.get<string>('kakao.clientSecret'),
      callbackURL: configService.get<string>('kakao.callbackURL'),
    });
  }

  async validate(accessToken, refreshToken, profile, callback) {
    const profile_json = profile._json;
    const kakao_account = profile_json.kakao_account;
    const user: UserSessionDto = {
      userId: undefined,
      userName: undefined,
      email: kakao_account.has_email ? kakao_account.email : null,
      loginType: LoginType.SOCIAL,
      socialType: SocialType.KAKAO,
      socialUserId: String(profile.id),
      accessToken: accessToken,
    };
    const existingUser = await this.authService.getUserDtoBySocialUserId(
      user.socialUserId,
      user.socialType,
    );
    if (existingUser) {
      user.userId = existingUser.userId;
      user.userName = existingUser.userName;
    }
    callback(null, user);
  }
}
