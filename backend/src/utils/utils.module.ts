
import { HttpModule } from "@nestjs/axios";
import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import TypeOrmConfigService from "src/config/typeorm.config";
import { EventModule } from "src/event/event.module";
import { EventTimer } from "./event.timer.component";
import { KakaoSearch } from "./kakao.search.component";
import { SeoulEventInfo } from "./seoul.event.info.component";
import { TestController } from "./test.controller";

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    AuthModule,
    forwardRef(() => EventModule),
  ],
  controllers: [TestController],
  providers: [KakaoSearch, SeoulEventInfo, EventTimer],
  exports: [KakaoSearch, EventTimer],
})
export class UtilsModule {}
