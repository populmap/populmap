import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthKakaoController } from './kakao/auth.kakao.controller';
import { KakaoStrategy } from './kakao/kakao.strategy';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import User from 'src/entities/user.entity';
import AuthSocial from 'src/entities/auth.social.entity';
import AuthSite from 'src/entities/auth.site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthNaverController } from './naver/auth.naver.controller';
import { NaverStrategy } from './naver/naver.strategy';
import { GoogleStrategy } from './google/google.strategy';
import { AuthGoogleController } from './google/auth.google.controller';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './site/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UtilsModule } from 'src/utils/utils.module';

const repo = {
  provide: 'IAuthRepository',
  useClass: AuthRepository,
};

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, AuthSocial, AuthSite]),
    HttpModule,
    PassportModule,
    forwardRef(() => UtilsModule),
  ],
  providers: [
    KakaoStrategy,
    NaverStrategy,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    repo,
  ],
  controllers: [
    AuthController,
    AuthKakaoController,
    AuthNaverController,
    AuthGoogleController,
  ],
  exports: [],
})
export class AuthModule {}
