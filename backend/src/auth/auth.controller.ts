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
  NotFoundException,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
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
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { EmailSender } from 'src/utils/email.sender.component';
import { IdBodyRequestDto } from 'src/dto/request/id.body.request.dto';
import { PasswordBodyRequestDto } from 'src/dto/request/password.body.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private emailSender: EmailSender,
  ) {}

  @ApiOperation({
    summary: '사이트 자체 회원가입 요청',
    description:
      '사이트 자체 회원가입 요청을 합니다. 이메일, 아이디, 비밀번호 입력받습니다.',
  })
  @ApiCreatedResponse({
    description: '회원가입 성공 시, 201 Created를 응답받습니다.',
  })
  @ApiConflictResponse({
    description:
      '이미 아이디나 이메일이 존재하는 경우, 409 Conflict를 응답받습니다.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '가입할 이메일',
          format: 'email',
          nullable: false,
        },
        userName: {
          type: 'string',
          description: '가입할 유저 이름',
          nullable: false,
        },
        password: {
          type: 'string',
          description: '가입할 비밀번호',
          format: 'password',
          nullable: false,
        },
      },
    },
  })
  @Post('/register')
  @HttpCode(HttpStatus.CONFLICT)
  async register(
    @Body(new ValidationPipe()) user: UserRegisterRequestDto,
    @Res() res: Response,
  ) {
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
    description:
      '아이디/이메일 혹은 비밀번호가 틀린 경우, 401 Unauthorized를 응답받습니다.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '가입한 유저 이름 혹은 이메일',
          nullable: false,
        },
        password: {
          type: 'string',
          description: '가입한 비밀번호',
          format: 'password',
          nullable: false,
        },
      },
    },
  })
  @Post('/login')
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
    description: '로그아웃 요청을 합니다. 성공 시, accessToken을 삭제합니다.',
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
            break;
          case SocialType.NAVER:
            await this.authService.unlinkNaver(user);
            break;
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

  @ApiOperation({
    summary: '비밀번호 찾기 요청',
    description:
      '비밀번호 찾기 요청을 합니다. 아이디 혹은 이메일을 입력받습니다. 해당 유저가 존재하면, 임시 비밀번호를 생성하여 이메일로 전송합니다.',
  })
  @ApiNoContentResponse({
    description:
      '임시 비밀번호 생성 및 이메일 발송 성공 시, 204 No Content를 응답받습니다.',
  })
  @ApiNotFoundResponse({
    description:
      '해당 유저가 존재하지 않는 경우, 404 Not Found를 응답받습니다.',
  })
  @ApiBadRequestResponse({
    description:
      '아이디 혹은 이메일을 입력하지 않은 경우, 400 Bad Request를 응답받습니다.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '아이디 혹은 이메일',
          nullable: false,
        },
      },
    },
  })
  @Patch('password/find')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async findPassword(@Body() idBody: IdBodyRequestDto) {
    this.logger.debug(`Called ${this.findPassword.name}`);
    try {
      const user = await this.authService.getSiteUserDto(idBody.id);
      if (!user) {
        throw new NotFoundException(`🚨 존재하지 않는 유저입니다. 🥲 🚨`);
      }
      const password = await this.authService.generatePasswordAndUpdate(user);
      this.emailSender.sendPasswordEmail(user.email, password);
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
    summary: '비밀번호 변경 요청',
    description:
      '비밀번호 변경 요청을 합니다. 변경할 비밀번호를 입력받습니다. 성공 시, DB에 저장된 비밀번호를 변경합니다.',
  })
  @ApiNoContentResponse({
    description: '비밀번호 변경 성공 시, 204 No Content를 응답받습니다.',
  })
  @ApiBadRequestResponse({
    description:
      '변경할 비밀번호를 입력하지 않은 경우, 400 Bad Request를 응답받습니다.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          description: '변경할 비밀번호',
          format: 'password',
          nullable: false,
        },
      },
    },
  })
  @Patch('password/change')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() passwordBody: PasswordBodyRequestDto,
    @User() user: UserSessionDto,
  ) {
    this.logger.debug(`Called ${this.changePassword.name}`);
    try {
      await this.authService.changePassword(
        user.userId,
        passwordBody.newPassword,
      );
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
