import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import TypeOrmConfigService from "src/config/typeorm.config";
import { UtilsModule } from "src/utils/utils.module";
import { EventService } from "./event.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [EventService],
})
export class EventModule {}
