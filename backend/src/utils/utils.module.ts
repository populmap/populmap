
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import TypeOrmConfigService from "src/config/typeorm.config";
import { KakaoSearch } from "./kakao.search.component";
import { SeoulEventInfo } from "./seoul.event.info.component";
import { TestController } from "./test.controller";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  controllers: [TestController],
  providers: [KakaoSearch, SeoulEventInfo],
})
export class UtilsModule {}
