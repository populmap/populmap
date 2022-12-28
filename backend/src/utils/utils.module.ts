import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import MailerConfigService from 'src/config/mailer.config';
import TypeOrmConfigService from 'src/config/typeorm.config';
import { EmailSender } from './email.sender.component';
import { KakaoSearch } from './kakao.search.component';
import { RealtimeCityDataComponent } from './realtime.city.data.component';
import { CityModule } from 'src/city/city.module';
import { EventInformationDataComponent } from './event.information.data.component';
import { EventModule } from 'src/event/event.module';
import { ToolBoxComponent } from './toolbox.component';

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
    ScheduleModule.forRoot(),
    HttpModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CityModule),
    forwardRef(() => EventModule),
  ],
  controllers: [],
  providers: [
    KakaoSearch,
    EmailSender,
    RealtimeCityDataComponent,
    EventInformationDataComponent,
    ToolBoxComponent,
  ],
  exports: [EmailSender, KakaoSearch, ToolBoxComponent],
})
export class UtilsModule {}
