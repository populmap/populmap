import { Controller, Get, Logger, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { User } from "src/decorator/user.decorator";
import { UserSessionDto } from "src/dto/user.session.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/guard/jwt.auth.guard";

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    ){}

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response, @User() user: UserSessionDto) {
    await this.authService.logout(res, user);
    return res.redirect('/');
  }
}
