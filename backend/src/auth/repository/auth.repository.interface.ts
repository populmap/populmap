import { UserDto } from 'src/dto/user.dto';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { UserValidateDto } from 'src/dto/user.validate.dto';
import SocialType from 'src/enums/social.type.enum';

export interface IAuthRepository {
  /**
   * email로 해당 유저의 정보를 얻는다.
   * @param email
   */
  getUserByEmail(email: string): Promise<UserDto>;

  /**
   * userName으로 해당 유저의 정보를 얻는다.
   * @param userName
   */
  getUserByUserName(userName: string): Promise<UserDto>;

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
   * 유저의 비밀번호를 업데이트한다.
   * @param userId
   * @param password
   */
  updatePassword(userId: number, hashedPassword: string): Promise<void>;

  /**
   * socialUserId으로 해당 소셜 플랫폼의 유저의 정보를 얻는다.
   * @param socialUserId
   * @param socialType
   */
  getSocialUserByUserId(
    socialUserId: string,
    socialType: SocialType,
  ): Promise<UserDto>;

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

  /**
   * userId에 해당하는 유저의 isTemporary를 변경한다.
   * @param userId
   */
  updateIsTemporary(userId: number, isTemporary: boolean): Promise<void>;

  /**
   * userId에 해당하는 유저의 isTemporary를 가져온다
   * @param userId
   * @return isTemporary
   */
  getIsTemporary(userId: number): Promise<boolean>;

  /**
   * userId에 해당하는 유저의 hashed 비밀번호를 가져온다
   * @param userId
   * @return hashedPassword
   */
  getHashedPassword(userId: number): Promise<string>;
}
