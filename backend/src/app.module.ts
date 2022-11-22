import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import TypeOrmConfigService from './config/typeorm.config';
import { SessionMiddleware } from './middleware/session.middleware';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/build'),
      exclude: ['/api/(.*)', '/auth/(.*)'],
    }),
    AuthModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [SessionMiddleware],
})
export class AppModule implements NestModule {
  constructor(public sessionMiddleware: SessionMiddleware) {}

  configure(consumer: MiddlewareConsumer) {
    // jwt 토큰이 쿠키에 저장되므로 모든 경로에 대해 미들웨어 적용.
    consumer.apply(this.sessionMiddleware.cookieParser).forRoutes('*');
  }
}
