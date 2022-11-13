import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KakaoGuard } from './kakao/guard/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(){}

  @Get('/login')
  @UseGuards(KakaoGuard)
  async login() {
    console.log('login success!');
  }

  @Get('/login/callback')
  @UseGuards(KakaoGuard)
  async loginCallback(@Res() res: Response, user) {
    console.log('callback success!');
    console.log(user);
    return res.redirect('/');
  }

  // @Get('/logout')
  // async logout(@Res() res: Response) {
  //   console.log('logout success!');
  //   return res.redirect('/');
  // }
}
