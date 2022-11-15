import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAuthRepository } from './repository/auth.repository.interface';
import { v4 as uuid } from 'uuid';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserDto } from 'src/dto/user.dto';
import SocialType from 'src/enums/social.type.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private readonly httpService: HttpService,
  ) {}

  async addSocialUserIfNotExists(user: UserSessionDto): Promise<UserDto> {
    this.logger.debug(`Called ${this.addSocialUserIfNotExists.name}`);
    // user 테이블에서 userId로 auth_social에서 유저 조회.
    // 이미 존재하는 유저라면 null return
    if (await this.authRepository.findUserByEmail(user.email)) {
      return null;
    }
    if (await this.authRepository.findSocialUserByUserId(user.socialUserId, user.socialType)) {
      return null;
    }
    // 없었던 유저라면 랜덤 userName을 생성.
    const userName = uuid();
    // user 테이블에 삽입.
    const userId = await this.authRepository.addSocialUser(userName, user.email)
    // auth_social에 삽입.
    await this.authRepository.insertAuthSocial(userId, user);
    return { userId, userName };
  }

  async getUserDtoBySocialUserId(socialUserId: string, socialType: SocialType): Promise<UserDto> {
    this.logger.debug(`Called ${this.getUserDtoBySocialUserId.name}`);
    return await this.authRepository.getUserDtoBySocialUserId(socialUserId, socialType);
  }

  async logout(res: Response, user: UserSessionDto): Promise<void> {
    this.logger.debug(`Called ${this.logout.name}`);
    const url = 'https://kapi.kakao.com/v1/user/logout';
    const headersRequest = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${user.accessToken}`,
    };
    await firstValueFrom(
      this.httpService
        .get(url, { headers: headersRequest })
        .pipe(map((res) => res.data)),
      )
      .then((data) => {
        console.log(data);
        res.clearCookie('populmap_token');
        console.log('logout success!');
      })
      .catch((err) => {
        throw err;
      });
  }
}
