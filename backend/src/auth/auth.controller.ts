import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
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
import { ApiOperation, ApiFoundResponse, ApiCreatedResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiConflictResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '사이트 자체 회원가입 요청',
    description:
      '사이트 자체 회원가입 요청을 합니다. 이메일, 아이디, 비밀번호 입력받습니다.',
  })
  @ApiCreatedResponse({
    description: '회원가입 성공 시, 201 Created를 응답받습니다.',
  })
  @ApiConflictResponse({
    description: '이미 아이디나 이메일이 존재하는 경우, 409 Conflict를 응답받습니다.',
  })
  @Post('/register')
  @HttpCode(HttpStatus.CONFLICT)
  async register(@Body(new ValidationPipe()) user: UserRegisterRequestDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.register.name}`);
    try {
      await this.authService.register(user, res);
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

  @ApiOperation({
    summary: '사이트 자체 회원, 로그인 요청',
    description:
      '사이트 자체 회원의 로그인 요청을 합니다. 이메일/아이디와 비밀번호 입력받습니다.',
  })
  @ApiOkResponse({
    description: '로그인 성공 시, 200 OK를 응답받습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '아이디/이메일 혹은 비밀번호가 틀린 경우, 401 Unauthorized를 응답받습니다.',
  })
  @Get('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.login.name}`);
    try {
      await this.authService.login(user, res);
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

  @ApiOperation({
    summary: '로그아웃 요청',
    description:
      '로그아웃 요청을 합니다. 성공 시, accessToken을 삭제합니다.',
  })
  @ApiOkResponse({
    description: '로그아웃 성공 시, 200 OK를 응답받습니다.',
  })
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    this.logger.debug(`Called ${this.logout.name}`);
    try {
      await this.authService.logout(res);
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

  @ApiOperation({
    summary: '회원탈퇴 요청',
    description:
      '회원탈퇴 요청을 합니다. 성공 시, accessToken을 삭제하고, DB에서 회원정보를 삭제합니다. 소셜 로그인 회원의 경우 소셜 연동도 해제합니다.',
  })
  @ApiNoContentResponse({
    description: '회원탈퇴 성공 시, 204 No Content를 응답받습니다.',
  })
  @Delete('/withdraw')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async withdraw(@User() user: UserSessionDto, @Res() res: Response) {
    this.logger.debug(`Called ${this.withdraw.name}`);
    try {
      if (user.loginType === LoginType.SOCIAL) {
        switch (user.socialType) {
          case SocialType.KAKAO:
            await this.authService.unlinkKakao(user);
            break ;
          case SocialType.NAVER:
            await this.authService.unlinkNaver(user);
            break ;
        }
      }
      await this.authService.withdraw(user.userId, res);
      res.send();
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
