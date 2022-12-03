import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBookmarkModule } from './bookmark/event.bookmark.module';
import { EventSearchModule } from './search/event.search.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Event, Bookmark]),
    EventSearchModule,
    EventBookmarkModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class EventModule {}
