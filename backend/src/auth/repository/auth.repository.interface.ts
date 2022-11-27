import { UserDto } from 'src/dto/user.dto';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserValidateDto } from 'src/dto/user.validate.dto';
import SocialType from 'src/enums/social.type.enum';

export interface IAuthRepository {
  /**
   * email로 해당 유저가 이미 존재하는지 확인한다.
   * @param email
   */
  findUserByEmail(email: string): Promise<boolean>;

  /**
   * userName으로 해당 유저가 이미 존재하는지 확인한다.
   * @param userName
   */
  findUserByUserName(userName: string): Promise<boolean>;

  /**
   * email로 해당 site 유저 정보를 얻는다.
   * @param email
   */
  getSiteUserByEmail(email: string): Promise<UserValidateDto>;

  /**
   * userName으로 해당 site 유저 정보를 얻는다.
   * @param userName
   */
  getSiteUserByUserName(userName: string): Promise<UserValidateDto>;

  /**
   * socialUserId으로 해당 소셜 플랫폼의 유저가 존재하는지 확인한다.
   * @param socialUserId
   * @param socialType
   */
  findSocialUserByUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<boolean>;

  /**
   * 새로운 소셜 로그인 유저를 추가한다.
   * @param userName
   * @param email
   * @return user_id
   */
  createSocialUser(userName: string, email: string): Promise<number>;

  /**
   * auth_social 테이블에 새 유저 정보를 추가한다.
   * @param userId
   * @param user
   */
  insertAuthSocial(userId: number, user: UserSessionDto): Promise<void>;

  /**
   * 새로운 사이트 로그인 유저를 추가한다.
   * @param userName
   * @param email
   */
  createSiteUser(userName: string, email: string): Promise<number>;

  /**
   * auth_site 테이블에 새 유저 정보를 추가한다.
   * @param userId
   * @param password
   */
  insertAuthSite(userId: number, password: string): Promise<void>;

  /**
   * userId에 해당하는 유저를 삭제한다.
   * @param userId
   */
  deleteUser(userId: number): Promise<void>;
}
