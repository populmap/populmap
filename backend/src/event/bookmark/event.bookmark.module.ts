import { Module, forwardRef } from '@nestjs/common';
import { EventBookmarkController } from './event.bookmark.controller';
import { EventBookmarkService } from './event.bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bookmark from 'src/entities/bookmark.entity';
import Event from 'src/entities/event.entity';
import User from 'src/entities/user.entity';
import { EventModule } from '../event.module';

@Module({
  imports: [
    forwardRef(() => EventModule),
    TypeOrmModule.forFeature([Event, User, Bookmark]),
  ],
  providers: [EventBookmarkService],
  controllers: [EventBookmarkController],
})
export class EventBookmarkModule {}
