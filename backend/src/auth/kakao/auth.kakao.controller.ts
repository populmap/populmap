import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JWTSignGuard } from '../jwt/guard/jwt.sign.guard';
import { KakaoGuard } from './guard/kakao.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  private logger = new Logger(AuthKakaoController.name);
  constructor() {}

  @Get('/login')
  @UseGuards(KakaoGuard)
  async login() {
    this.logger.debug(`Called ${this.login.name}`);
    this.logger.log('Try login...');
  }

  @Get('/login/callback')
  @UseGuards(KakaoGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response) {
    this.logger.debug(`Called ${this.loginCallback.name}`);
    this.logger.log('login success!');
    return res.redirect('/');
  }
}
