import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * passport-kakao의 기본 인증을 사용한다.
 */
@Injectable()
export class KakaoGuard extends AuthGuard('kakao') {}
