import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserSocialDto } from 'src/dto/user.social.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/guard/jwt.auth.guard';
import { JWTSignGuard } from './jwt/guard/jwt.sign.guard';
import { KakaoGuard } from './kakao/guard/kakao.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  constructor(
    private authService: AuthService,
    ){}

  @Get('/login')
  @UseGuards(KakaoGuard)
  async login() {
    console.log('login success!');
  }

  @Get('/login/callback')
  @UseGuards(KakaoGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response, @User() user: UserSessionDto) {
    console.log('callback success!');
    console.log(user);
    return res.redirect('/');
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response, @User() user: UserSessionDto) {
    await this.authService.logout(res, user);
    return res.redirect('/');
  }
}
