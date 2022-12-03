import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventBookmarkService } from './event.bookmark.service';

@ApiTags('event/bookmark')
@Controller({
  path: 'event/bookmark',
})
export class EventBookmarkController {
  private logger = new Logger(EventBookmarkController.name);
  constructor(private eventBookmarkService: EventBookmarkService) {}
}
