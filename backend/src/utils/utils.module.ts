import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { EventModule } from 'src/event/event.module';
import { EventTimer } from './event.timer.component';
import { KakaoSearch } from './kakao.search.component';
import { SeoulEventInfo } from './seoul.event.info.component';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    AuthModule,
    forwardRef(() => EventModule),
  ],
  providers: [KakaoSearch, SeoulEventInfo, EventTimer],
  exports: [KakaoSearch, EventTimer],
})
export class UtilsModule {}
