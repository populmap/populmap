import { IAuthRepository } from './auth.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/entities/user.entity';
import AuthSocial from 'src/entities/auth.social.entity';
import LoginType from 'src/enums/login.type.enum';
import { UserSessionDto } from 'src/dto/user.session.dto';
import SocialType from 'src/enums/social.type.enum';
import { UserDto } from 'src/dto/user.dto';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AuthSocial)
    private authSocialRepository: Repository<AuthSocial>,
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

  async getUserDtoBySocialUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<UserDto> {
    const result = await this.authSocialRepository.findOne({
      relations: ['user'],
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
    // const result = await this.authSocialRepository.createQueryBuilder()
    // .select('user.userId', 'userId')
    // .addSelect('user.userName', 'userName')
    // .from(User, 'user')
    // .innerJoin(AuthSocial, 'authSocial', 'user.userId = authSocial.userId')
    // .where('authSocial.socialUserId = :socialUserId', { socialUserId: socialUserId })
    // .andWhere('authSocial.socialType = :socialType', { socialType: socialType })
    // .getOne();
    if (!result) {
      return null;
    }
    return {
      userId: result.user.userId,
      userName: result.user.userName,
    };
  }
}
