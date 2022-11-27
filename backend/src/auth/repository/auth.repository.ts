import { IAuthRepository } from './auth.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/entities/user.entity';
import AuthSocial from 'src/entities/auth.social.entity';
import LoginType from 'src/enums/login.type.enum';
import { UserSessionDto } from 'src/dto/user.session.dto';
import SocialType from 'src/enums/social.type.enum';
import { UserDto } from 'src/dto/user.dto';
import AuthSite from 'src/entities/auth.site.entity';
import { UserValidateDto } from 'src/dto/user.validate.dto';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AuthSocial)
    private authSocialRepository: Repository<AuthSocial>,
    @InjectRepository(AuthSite)
    private authSiteRepository: Repository<AuthSite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }

  async findUserByUserName(userName: string): Promise<boolean> {
    const result = await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }

  async getSiteUserByEmail(email: string): Promise<UserValidateDto> {
    const result = await this.userRepository.findOne({
      relations: {
        authSite: true,
      },
      select: {
        userId: true,
        email: true,
        userName: true,
        authSite: {
          password: true,
        },
      },
      where: {
        email: email,
      },
    });
    if (!result) {
      return null;
    }
    return {
      userId: result.userId,
      email: result.email,
      userName: result.userName,
      password: result.authSite.password,
    };
  }

  async getSiteUserByUserName(userName: string): Promise<UserValidateDto> {
    const result = await this.userRepository.findOne({
      relations: {
        authSite: true,
      },
      select: {
        userId: true,
        email: true,
        userName: true,
        authSite: {
          password: true,
        },
      },
      where: {
        userName: userName,
      },
    });
    if (!result) {
      return null;
    }
    return {
      userId: result.userId,
      email: result.email,
      userName: result.userName,
      password: result.authSite.password,
    };
  }

  async findSocialUserByUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<boolean> {
    const result = await this.authSocialRepository.findOne({
      where: {
        socialUserId: socialUserId,
        socialType: socialType,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }

  async createSocialUser(userName: string, email: string): Promise<number> {
    const result = await this.userRepository.insert({
      userName: userName,
      email: email,
      loginType: LoginType.SOCIAL,
    });
    return result.identifiers.pop()['userId'];
  }

  async insertAuthSocial(userId: number, user: UserSessionDto): Promise<void> {
    await this.authSocialRepository.insert({
      userId: userId,
      socialUserId: user.socialUserId,
      socialType: user.socialType,
      accessToken: user.accessToken,
      firstLogin: new Date(),
      lastLogin: new Date(),
    });
  }

  async createSiteUser(userName: string, email: string): Promise<number> {
    const result = await this.userRepository.insert({
      userName: userName,
      email: email,
      loginType: LoginType.SITE,
    });
    return result.identifiers.pop()['userId'];
  }

  async insertAuthSite(userId: number, password: string): Promise<void> {
    await this.authSiteRepository.insert({
      siteUserId: userId,
      password: password,
      firstLogin: new Date(),
      lastLogin: new Date(),
    });
  }

  async getUserDtoBySocialUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<UserDto> {
    const result = await this.authSocialRepository.findOne({
      relations: {
        user: true,
      },
      select: {
        user: {
          userId: true,
          userName: true,
        },
      },
      where: {
        socialUserId: socialUserId,
        socialType: socialType,
      },
    });
    if (!result) {
      return null;
    }
    return {
      userId: result.user.userId,
      userName: result.user.userName,
    };
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete({
      userId: userId,
    });
  }
}
