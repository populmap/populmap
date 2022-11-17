import {
  Body,
  Controller,
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
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/guard/jwt.auth.guard';
import { LocalAuthGuard } from './site/guard/local.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: UserRegisterRequestDto, @Res() res: Response) {
    await this.authService.register(user, res);
    return res.redirect('/');
  }

  @Get('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Res() res: Response, @User() user: UserSessionDto) {
    await this.authService.login(user, res);
    return res.redirect('/');
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    return res.redirect('/');
  }
}
