import { Controller, Get, Logger, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { User } from "src/decorator/user.decorator";
import { UserSessionDto } from "src/dto/user.session.dto";
import { AuthService } from "./auth.service";
import { GoogleGuard } from "./google/guard/google.guard";
import { JwtAuthGuard } from "./jwt/guard/jwt.auth.guard";
import { JWTSignGuard } from "./jwt/guard/jwt.sign.guard";

@Controller('auth/google')
export class AuthGoogleController {
  private logger = new Logger(AuthGoogleController.name);
  constructor(
    private authService: AuthService,
    ){}

  @Get('/login')
  @UseGuards(GoogleGuard)
  async login() {
    this.logger.log('Try login...');
  }

  @Get('/login/callback')
  @UseGuards(GoogleGuard, JWTSignGuard)
  async loginCallback(@Res() res: Response) {
    this.logger.log('login success!');
    return res.redirect('/');
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response, @User() user: UserSessionDto) {
    await this.authService.logout(res, user);
    return res.redirect('/');
  }
}
