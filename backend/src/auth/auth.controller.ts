import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserRegisterRequestDto } from 'src/dto/request/user.register.request.dto';
import { UserSessionDto } from 'src/dto/user.session.dto';
import LoginType from 'src/enums/login.type.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/guard/jwt.auth.guard';
import { LocalAuthGuard } from './site/guard/local.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() user: UserRegisterRequestDto, @Res() res: Response) {
    this.logger.log('registered!');
    const userDto = await this.authService.createSiteUserIfNotExists(user);
    const userSessionDto: UserSessionDto = {
      loginType: LoginType.SITE,
      userId: userDto.userId,
      userName: userDto.userName,
      email: userDto.email,
    };
    const token = this.jwtService.sign(userSessionDto);
    res.cookie('populmap_token', token);
    return token;
  }

  @Get('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Res() res: Response, @User() user: UserSessionDto) {
    const token = this.jwtService.sign(user);
    res.cookie('populmap_token', token);
    return res.redirect('/');
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    return res.redirect('/');
  }
}
