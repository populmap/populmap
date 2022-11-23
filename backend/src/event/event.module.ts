import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import TypeOrmConfigService from "src/config/typeorm.config";
import EventDetail from "src/entities/event.detail.entity";
import Event from "src/entities/event.entity";
import { UtilsModule } from "src/utils/utils.module";
import { EventService } from "./event.service";
import { EventRepository } from "./repository/event.repository";

const repo = {
  provide: 'IEventRepository',
  useClass: EventRepository,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventDetail]),
    AuthModule,
    forwardRef(() => UtilsModule),
  ],
  controllers: [],
  providers: [EventService, repo],
  exports: [EventService],
})
export class EventModule {}
