import { Module } from "@nestjs/common";
import { EventBookmarkController } from "./event.bookmark.controller";
import { EventBookmarkService } from "./event.bookmark.service";

@Module({
  imports: [
    // TypeOrmModule.forFeature([Bookmark]),
  ],
  providers: [EventBookmarkService],
  controllers: [EventBookmarkController],
})
export class EventBookmarkModule {}
