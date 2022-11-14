import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { UserSessionDto } from "src/dto/user.session.dto";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('kakao.clientID'),
      clientSecret: configService.get<string>('kakao.clientSecret'),
      callbackURL: configService.get<string>('kakao.callbackURL'),
    });
  }

  async validate(accessToken, refreshToken, profile, callback) {
    const profile_json = profile._json;
    const kakao_account = profile_json.kakao_account;
    console.log(profile);
    console.log(accessToken);
    const user: UserSessionDto = {
      user_id: profile_json.id,
      nickname: kakao_account.profile.nickname,
      profile_url: profile_json.properties.thumbnail_image,
      email: kakao_account.has_email ? kakao_account.email : null,
      access_token: accessToken,
    };
    console.log(user);
    callback(null, user);
  }
}

