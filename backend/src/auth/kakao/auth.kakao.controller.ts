import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import { JWTSignGuard } from '../jwt/guard/jwt.sign.guard';
import { KakaoGuard } from './guard/kakao.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  private logger = new Logger(AuthKakaoController.name);
  constructor(private authService: AuthService) {}

  @Get('/login')
  @UseGuards(KakaoGuard)
  async login() {
    this.logger.log('Try login...');
  }

  @Get('/login/callback')
  @UseGuards(KakaoGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response) {
    this.logger.log('login success!');
    return res.redirect('/');
  }
}
