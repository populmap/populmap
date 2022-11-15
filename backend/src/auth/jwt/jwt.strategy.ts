import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

const extracter = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['populmap_token'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: extracter,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    console.log('jwt strate validate');
    console.log(payload);
    return payload;
  }
}
