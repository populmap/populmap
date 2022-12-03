import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventSearchService } from './event.search.service';

@ApiTags('event/search')
@Controller({
  path: 'event/search',
})
export class EventSearchController {
  private logger = new Logger(EventSearchController.name);
  constructor(private eventSearchService: EventSearchService) {}
}
