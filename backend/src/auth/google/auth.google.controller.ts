import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleGuard } from './guard/google.guard';
import { JWTSignGuard } from '../jwt/guard/jwt.sign.guard';

@Controller('auth/google')
export class AuthGoogleController {
  private logger = new Logger(AuthGoogleController.name);

  @Get('/login')
  @UseGuards(GoogleGuard)
  async login() {
    this.logger.debug(`Called ${this.login.name}`);
    this.logger.log('Try login...');
  }

  @Get('/login/callback')
  @UseGuards(GoogleGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response) {
    this.logger.debug(`Called ${this.loginCallback.name}`);
    this.logger.log('login success!');
    return res.redirect('/');
  }
}
