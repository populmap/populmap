import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthRepository } from './repository/auth.repository.interface';
import { v4 as uuid } from 'uuid';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserDto } from 'src/dto/user.dto';
import { Response } from 'express';
import { UserRegisterRequestDto } from 'src/dto/request/user.register.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import LoginType from 'src/enums/login.type.enum';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
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

  async getSiteUserDto(id: string): Promise<UserDto> {
    this.logger.debug(`Called ${this.getSiteUserDto.name}`);
    let user = await this.authRepository.getUserByEmail(id);
    if (!user) {
      user = await this.authRepository.getUserByUserName(id);
    }
    if (!user) {
      return null;
    }
    return user;
  }

  async generatePasswordAndUpdate(user: UserDto): Promise<string> {
    this.logger.debug(`Called ${this.generatePasswordAndUpdate.name}`);
    const password = uuid();
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.authRepository.updatePassword(user.userId, hashedPassword);
    this.logger.log('password updated!');
    return password;
  }

  async changePassword(userId: number, newPassword: string): Promise<void> {
    this.logger.debug(`Called ${this.changePassword.name}`);
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.authRepository.updatePassword(userId, hashedPassword);
    this.logger.log('password updated!');
  }

  async createSocialUserIfNotExists(user: UserSessionDto): Promise<UserDto> {
    this.logger.debug(`Called ${this.createSocialUserIfNotExists.name}`);
    let userDto: UserDto;
    if (
      (userDto = await this.authRepository.getUserByEmail(user.email)) ||
      (userDto = await this.authRepository.getSocialUserByUserId(
        user.socialUserId,
        user.socialType,
      ))
    ) {
      return userDto;
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

  async createSiteUserIfNotExists(
    user: UserRegisterRequestDto,
  ): Promise<UserDto> {
    this.logger.debug(`Called ${this.createSiteUserIfNotExists.name}`);
    if (await this.authRepository.getUserByEmail(user.email)) {
      return null;
    }
    if (await this.authRepository.getUserByUserName(user.userName)) {
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
    if (!userDto) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }
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

  async socialRegister(user: UserSessionDto, res: Response): Promise<void> {
    this.logger.debug(`Called ${this.socialRegister.name}`);
    const userDto = await this.createSocialUserIfNotExists(user);
    user.userId = userDto.userId;
    user.userName = userDto.userName;
    const token = this.jwtService.sign(user);
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

  async withdraw(userId: number, res: Response): Promise<void> {
    this.logger.debug(`Called ${this.withdraw.name}`);
    await this.authRepository.deleteUser(userId);
    res.clearCookie('populmap_token');
    this.logger.log('withdraw success!');
  }

  async unlinkKakao(user: UserSessionDto) {
    this.logger.debug(`Called ${this.unlinkKakao.name}`);
    const url = `https://kapi.kakao.com/v1/user/unlink`;
    const headersRequest = {
      Authorization: `Bearer ${user.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const config = { headers: headersRequest };
    this.logger.debug(`Request url: ${url}`);
    await firstValueFrom(
      this.httpService.post(url, null, config).pipe(map((res) => res.data)),
    )
      .then(async (data) => {
        this.logger.debug(`Response data: ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        throw err;
      });
  }

  async unlinkNaver(user: UserSessionDto) {
    this.logger.debug(`Called ${this.unlinkNaver.name}`);
    const url = `https://nid.naver.com/oauth2.0/token`;
    const params = {
      grant_type: 'delete',
      client_id: this.configService.get<string>('naver.clientID'),
      client_secret: this.configService.get<string>('naver.clientSecret'),
      access_token: user.accessToken,
      service_provider: 'NAVER',
    };
    const config = { params };
    this.logger.debug(`Request url: ${url}`);
    await firstValueFrom(
      this.httpService.post(url, null, config).pipe(map((res) => res.data)),
    )
      .then(async (data) => {
        this.logger.debug(`Response data: ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateIsTemporary(userId: number, isTemporary: boolean): Promise<void> {
    this.logger.debug(`Called ${this.updateIsTemporary.name}`);
    await this.authRepository.updateIsTemporary(userId, isTemporary);
  }

  async getIsTemporary(userId: number): Promise<boolean> {
    this.logger.debug(`Called ${this.getIsTemporary.name}`);
    return await this.authRepository.getIsTemporary(userId);
  }

  async assertPassword(userId: number, password: string): Promise<void> {
    this.logger.debug(`Called ${this.assertPassword.name}`);
    const hashedPassword = await this.authRepository.getHashedPassword(userId);
    if (!(await bcrypt.compare(password, hashedPassword))) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }
}
