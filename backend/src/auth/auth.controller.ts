import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserRegisterRequestDto } from 'src/dto/request/user.register.request.dto';
import { UserSessionDto } from 'src/dto/user.session.dto';
import LoginType from 'src/enums/login.type.enum';
import SocialType from 'src/enums/social.type.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/guard/jwt.auth.guard';
import { LocalAuthGuard } from './site/guard/local.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: UserRegisterRequestDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.register.name}`);
    await this.authService.register(user, res);
    return res.redirect('/');
  }

  @Get('/login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.login.name}`);
    await this.authService.login(user, res);
    return res.redirect('/');
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    this.logger.debug(`Called ${this.logout.name}`);
    await this.authService.logout(res);
    return res.redirect('/');
  }

  @Delete('/withdraw')
  @UseGuards(JwtAuthGuard)
  async withdraw(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.withdraw.name}`);
    if (user.loginType === LoginType.SOCIAL) {
      switch (user.socialType) {
        case SocialType.KAKAO:
          return res.redirect('/auth/kakao/withdraw');
        case SocialType.NAVER:
          return res.redirect('/auth/naver/withdraw');
        case SocialType.GOOGLE:
          return res.redirect('/auth/google/withdraw');
      }
    }
    await this.authService.withdraw(user.userId, res);
    return res.redirect('/');
  }
}
