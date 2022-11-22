import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import TypeOrmConfigService from 'src/config/typeorm.config';
import { KakaoSearch } from './kakao.search.component';
import { TestController } from './test.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    HttpModule,
    AuthModule,
  ],
  controllers: [TestController],
  providers: [KakaoSearch],
})
export class UtilsModule {}
