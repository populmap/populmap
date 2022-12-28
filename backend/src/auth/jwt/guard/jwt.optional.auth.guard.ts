import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * passport-jwt의 기본 인증을 사용.
 * 401 에러 시 커스텀 에러 메시지만 추가
 */
@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    return user ? user : null;
  }
}
