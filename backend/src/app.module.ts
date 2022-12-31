import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import configuration from './config/configuration';
import TypeOrmConfigService from './config/typeorm.config';
import { EventModule } from './event/event.module';
import { SessionMiddleware } from './middleware/session.middleware';
import { UtilsModule } from './utils/utils.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('No options');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/build'),
      exclude: ['/api/(.*)', '/auth/(.*)'],
    }),
    AuthModule,
    EventModule,
    CityModule,
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
