import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EventSearchService {
  private logger = new Logger(EventSearchService.name);
  constructor(
    // @Inject('IEventSearchRepository') private eventSearchRepository: IEventSearchRepository,
  ) {}

}
