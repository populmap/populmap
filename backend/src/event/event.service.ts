import { Injectable, Inject, Logger } from '@nestjs/common';
import { IEventRepository } from './repository/event.repository.interface';


@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);
  constructor(
    @Inject('IEventRepository') private eventRepository: IEventRepository,
  ) {}

}
