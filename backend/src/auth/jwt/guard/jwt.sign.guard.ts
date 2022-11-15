import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UserSessionDto } from "src/dto/user.session.dto";
import LoginType from "src/enums/login.type.enum";

@Injectable()
export class JWTSignGuard implements CanActivate {
  private logger = new Logger(JWTSignGuard.name);

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    return await this.generateJWTToken(req, res);
  }

  private async generateJWTToken(request: Request, response: Response): Promise<boolean> {
    const user = request.user as UserSessionDto | undefined;
    if (user === undefined) {
      this.logger.debug(`can't generate JWTToken`);
      return false;
    }
    console.log('jwt sign guard generateJWTToken');
    if (user.loginType === LoginType.SOCIAL) {
      const generatedUser = await this.authService.addSocialUserIfNotExists(user);
      if (generatedUser) {
        user.userId = generatedUser.userId;
        user.userName = generatedUser.userName;
      }
    } else {
      // await this.authService.addSiteUserIfNotExists(user);
    }
    const token = this.jwtService.sign(user);
    response.cookie('populmap_token', token);
    return true;
  }
}
