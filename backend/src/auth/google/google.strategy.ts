import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserSessionDto } from 'src/dto/user.session.dto';
import LoginType from 'src/enums/login.type.enum';
import SocialType from 'src/enums/social.type.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('google.clientID'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile, callback) {
    const user: UserSessionDto = {
      userId: undefined,
      userName: undefined,
      email: profile.emails[0].value,
      loginType: LoginType.SOCIAL,
      socialType: SocialType.GOOGLE,
      socialUserId: profile.id,
      accessToken: accessToken,
    };
    callback(null, user);
  }
}
