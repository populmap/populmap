import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { AuthService } from './auth.service';
import { KakaoGuard } from './kakao/guard/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Get('/login')
  @UseGuards(KakaoGuard)
  async login() {
    console.log('login success!');
  }

  @Get('/login/callback')
  @UseGuards(KakaoGuard)
  async loginCallback(@Res() res: Response, @User() user: UserSessionDto) {
    console.log('callback success!');
    console.log(user);
    // await this.authService.addUserIfNotExists(user);
    return res.redirect('/');
  }

  // @Get('/logout')
  // async logout(@Res() res: Response) {
  //   console.log('logout success!');
  //   return res.redirect('/');
  // }
}
