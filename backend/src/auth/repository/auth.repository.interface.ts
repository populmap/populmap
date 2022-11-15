import { UserDto } from "src/dto/user.dto";
import { UserSessionDto } from "src/dto/user.session.dto";
import SocialType from "src/enums/social.type.enum";

export interface IAuthRepository {

  /**
   * email로 해당 유저가 이미 존재하는지 확인한다.
   * @param email
   */
  findUserByEmail(email: string): Promise<Boolean>;

  /**
   * socialUserId으로 해당 소셜 플랫폼의 유저가 존재하는지 확인한다.
   * @param socialUserId
   * @param socialType
   */
  findSocialUserByUserId(socialUserId: string, socialType: SocialType): Promise<Boolean>;

  /**
   * 새로운 소셜 로그인 유저를 추가한다.
   * @param userName
   * @param email
   * @return user_id
   */
  addSocialUser(userName: string, email: string): Promise<number>;

  /**
   * auth.social 테이블에 새 유저 정보를 추가한다.
   * @param userId
   * @param user
   */
  insertAuthSocial(userId: number, user: UserSessionDto): Promise<void>;

  /**
   * socialUserId와 socialType으로 userDto를 얻는다.
   * 존재하지 않으면 null을 반환한다.
   * @param socialUserId
   */
  getUserDtoBySocialUserId(socialUserId: string, socailType: SocialType): Promise<UserDto>;
}
