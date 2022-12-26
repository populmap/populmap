import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBookmarkModule } from './bookmark/event.bookmark.module';
import { EventSearchModule } from './search/event.search.module';
import Event from 'src/entities/event.entity';
import Bookmark from 'src/entities/bookmark.entity';
import { EventRepository } from './repository/event.repository';
import { BookmarkRepository } from './repository/bookmark.repository';
import EventDetail from 'src/entities/event.detail.entity';
import { EventService } from './event.service';

const repo1 = {
  provide: 'IEventRepository',
  useClass: EventRepository,
};

const repo2 = {
  provide: 'IBookmarkRepository',
  useClass: BookmarkRepository,
};
@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventDetail, Bookmark]),
    EventSearchModule,
    EventBookmarkModule,
  ],
  providers: [EventService, repo1, repo2],
  controllers: [],
  exports: [EventService],
})
export class EventModule {}
