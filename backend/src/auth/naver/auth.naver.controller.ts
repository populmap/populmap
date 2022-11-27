import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { AuthService } from '../auth.service';
import { NaverGuard } from './guard/naver.guard';

@ApiTags('Auth/Naver')
@Controller('auth/naver')
export class AuthNaverController {
  private logger = new Logger(AuthNaverController.name);
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '네이버 회원, 로그인 요청',
    description:
      '네이버 로그인을 하고자 할 때 해당 URI로 접근해야 합니다. 접근하면 자동으로 네이버 OAuth 인증을 수행하며 인증이 완료되면 /login/callback 으로 리다이렉트 됩니다.',
  })
  @ApiFoundResponse({
    description: '네이버 OAuth 페이지로 리다이렉트되며 302 Found를 응답합니다.',
  })
  @Get('/login')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(NaverGuard)
  async login() {
    this.logger.debug(`Called ${this.login.name}`);
    this.logger.log('Try login...');
  }

  @ApiOperation({
    summary: '네이버 로그인 시도 후 처리에 대한 요청입니다.',
    description:
      '네이버 로그인 시도 후 OAuth 인증이 완료되면 해당 URI로 자동으로 리다이렉트 됩니다. 유저가 존재하지 않으면 유저를 생성하고, JWT 토큰을 발급 후 쿠키에 저장합니다.',
  })
  @ApiFoundResponse({
    description: '정상적으로 인증이 완료되었다면 main으로 리다이렉트 합니다.',
  })
  @Get('/login/callback')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(NaverGuard)
  async loginCallback(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.loginCallback.name}`);
    try {
      await this.authService.socialRegister(user, res);
      return res.redirect('/');
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(
          `🚨 populmap 내부 서버 에러가 발생했습니다 🥲 🚨`,
        );
      }
    }
  }
}
