import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventBookmarkService {
  private logger = new Logger(EventBookmarkService.name);
}
