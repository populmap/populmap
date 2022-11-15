import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Middleware } from "./middleware";
import * as cookieParser from 'cookie-parser';

@Injectable()
export class SessionMiddleware {
  cookieParser: Middleware;

  constructor(private configService: ConfigService) {
    this.cookieParser = cookieParser();
  }
}
