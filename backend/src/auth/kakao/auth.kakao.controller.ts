import { Controller, Delete, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt/guard/jwt.auth.guard';
import { JWTSignGuard } from '../jwt/guard/jwt.sign.guard';
import { KakaoGuard } from './guard/kakao.guard';

@Controller('auth/kakao')
export class AuthKakaoController {
  private logger = new Logger(AuthKakaoController.name);
  constructor(
    private authService: AuthService,
  ) {}

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

  @Delete('/withdraw')
  @UseGuards(JwtAuthGuard)
  async withdraw(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.withdraw.name}`);
    await this.authService.unlinkKakao(user, res);
  }
}
