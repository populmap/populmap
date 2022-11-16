import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import { JWTSignGuard } from '../jwt/guard/jwt.sign.guard';
import { NaverGuard } from './guard/naver.guard';

@Controller('auth/naver')
export class AuthNaverController {
  private logger = new Logger(AuthNaverController.name);
  constructor(private authService: AuthService) {}

  @Get('/login')
  @UseGuards(NaverGuard)
  async login() {
    this.logger.log('Try login...');
  }

  @Get('/login/callback')
  @UseGuards(NaverGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response) {
    this.logger.log('login success!');
    return res.redirect('/');
  }
}
