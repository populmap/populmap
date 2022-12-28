import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBookmarkModule } from './bookmark/event.bookmark.module';
import { EventSearchModule } from './search/event.search.module';
import Event from 'src/entities/event.entity';
import Bookmark from 'src/entities/bookmark.entity';
import { EventRepository } from './repository/event.repository';
import { BookmarkRepository } from './repository/bookmark.repository';
import EventDetail from 'src/entities/event.detail.entity';
import { EventService } from './event.service';
import { UtilsModule } from 'src/utils/utils.module';

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
    forwardRef(() => EventBookmarkModule),
    forwardRef(() => EventSearchModule),
    forwardRef(() => UtilsModule),
  ],
  providers: [EventService, repo1, repo2],
  controllers: [],
  exports: [EventService, repo1, repo2],
})
export class EventModule {}
