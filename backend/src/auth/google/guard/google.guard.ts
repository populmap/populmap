import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * passport-google의 기본 인증을 사용한다.
 */
@Injectable()
export class GoogleGuard extends AuthGuard('google') {}
