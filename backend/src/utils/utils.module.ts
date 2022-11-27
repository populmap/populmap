import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import MailerConfigService from 'src/config/mailer.config';
import TypeOrmConfigService from 'src/config/typeorm.config';
import { EmailSender } from './email.sender.component';
import { KakaoSearch } from './kakao.search.component';
import { TestController } from './test.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfigService,
    }),
    HttpModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [TestController],
  providers: [KakaoSearch, EmailSender],
  exports: [EmailSender],
})
export class UtilsModule {}
