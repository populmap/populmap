import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuthRepository } from './repository/auth.repository.interface';
import { v4 as uuid } from 'uuid';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserDto } from 'src/dto/user.dto';
import SocialType from 'src/enums/social.type.enum';
import { Response } from 'express';
import { UserRegisterRequestDto } from 'src/dto/request/user.register.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import LoginType from 'src/enums/login.type.enum';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateSiteUser(id: string, password: string): Promise<UserDto> {
    this.logger.debug(`Called ${this.validateSiteUser.name}`);
    let user = await this.authRepository.getSiteUserByEmail(id);
    if (!user) {
      user = await this.authRepository.getSiteUserByUserName(id);
    }
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    }
    return null;
  }

  async createSocialUserIfNotExists(user: UserSessionDto): Promise<UserDto> {
    this.logger.debug(`Called ${this.createSocialUserIfNotExists.name}`);
    // user 테이블에서 email로 유저 조회.
    // 이미 존재하는 유저라면 null return
    if (await this.authRepository.findUserByEmail(user.email)) {
      return null;
    }
    // user 테이블에서 userId로 auth_social에서 유저 조회.
    // 이미 존재하는 유저라면 null return
    if (
      await this.authRepository.findSocialUserByUserId(
        user.socialUserId,
        user.socialType,
      )
    ) {
      return null;
    }
    // 없었던 유저라면 랜덤 userName을 생성.
    const userName = uuid();
    // user 테이블에 삽입.
    const userId = await this.authRepository.createSocialUser(
      userName,
      user.email,
    );
    // auth_social에 삽입.
    await this.authRepository.insertAuthSocial(userId, user);
    return { userId, userName };
  }

  async getUserDtoBySocialUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<UserDto> {
    this.logger.debug(`Called ${this.getUserDtoBySocialUserId.name}`);
    return await this.authRepository.getUserDtoBySocialUserId(
      socialUserId,
      socialType,
    );
  }

  async createSiteUserIfNotExists(
    user: UserRegisterRequestDto,
  ): Promise<UserDto> {
    this.logger.debug(`Called ${this.createSiteUserIfNotExists.name}`);
    if (await this.authRepository.findUserByEmail(user.email)) {
      return null;
    }
    if (await this.authRepository.findUserByUserName(user.userName)) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const userId = await this.authRepository.createSiteUser(
      user.userName,
      user.email,
    );
    await this.authRepository.insertAuthSite(userId, hashedPassword);
    return { userId, userName: user.userName };
  }

  async register(user: UserRegisterRequestDto, res: Response): Promise<void> {
    const userDto = await this.createSiteUserIfNotExists(user);
    const userSessionDto: UserSessionDto = {
      loginType: LoginType.SITE,
      userId: userDto.userId,
      userName: userDto.userName,
      email: userDto.email,
    };
    const token = this.jwtService.sign(userSessionDto);
    res.cookie('populmap_token', token);
    this.logger.log('registered!');
  }

  async login(user: UserSessionDto, res: Response): Promise<void> {
    this.logger.debug(`Called ${this.login.name}`);
    const token = this.jwtService.sign(user);
    res.cookie('populmap_token', token);
    this.logger.log(`login success!`);
  }

  async logout(res: Response): Promise<void> {
    this.logger.debug(`Called ${this.logout.name}`);
    res.clearCookie('populmap_token');
    this.logger.log('logout success!');
  }
}
