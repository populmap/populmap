import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { UserSessionDto } from 'src/dto/user.session.dto';
import LoginType from 'src/enums/login.type.enum';
import SocialType from 'src/enums/social.type.enum';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('naver.clientID'),
      clientSecret: configService.get<string>('naver.clientSecret'),
      callbackURL: configService.get<string>('naver.callbackURL'),
    });
  }

  async validate(accessToken, refreshToken, profile, callback) {
    const user: UserSessionDto = {
      userId: undefined,
      userName: undefined,
      email: profile.emails[0].value,
      loginType: LoginType.SOCIAL,
      socialType: SocialType.NAVER,
      socialUserId: profile.id,
      accessToken: accessToken,
    };
    callback(null, user);
  }
}
