import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * passport-jwt의 기본 인증을 사용.
 * 401 에러 시 커스텀 에러 메시지만 추가
 */
 @Injectable()
 export class JwtAuthGuard extends AuthGuard('jwt') {
   handleRequest<TUser = any>(err: any, user: any): TUser {
     if (err || !user) {
      console.log(err);
      console.log(user);
      throw (
         err ||
         new UnauthorizedException(
           '🚨 로그인 정보가 만료되었습니다. 🥲 🚨\n다시 로그인해주세요.',
         )
       );
     }
     return user;
   }
 }
