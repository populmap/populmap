import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

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
    const kakao_account = profile._json.kakao_account;
    console.log(profile);
    const user = {
      nickname: kakao_account.profile.nickname,
      profile_url: kakao_account.thumbnail_image,
      email: kakao_account.has_email ? kakao_account.email : null,
    };
    callback(null, user);
  }
}

