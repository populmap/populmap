import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * passport-naver의 기본 인증을 사용한다.
 */
@Injectable()
export class NaverGuard extends AuthGuard('naver') {}
