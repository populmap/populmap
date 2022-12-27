import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventBookmarkService } from './event.bookmark.service';

@ApiTags('/api/event/bookmark')
@Controller({
  path: '/api/event/bookmark',
})
export class EventBookmarkController {
  private logger = new Logger(EventBookmarkController.name);
  constructor(private eventBookmarkService: EventBookmarkService) {}
}
