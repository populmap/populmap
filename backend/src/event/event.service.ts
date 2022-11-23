import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { SearchByPlaceDto } from 'src/dto/search.by.place.dto';
import { EventTimer } from 'src/utils/event.timer.component';
import { KakaoSearch } from 'src/utils/kakao.search.component';
import { IEventRepository } from './repository/event.repository.interface';

@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);
  constructor(
    @Inject('IEventRepository') private eventRepository: IEventRepository,
    @Inject(forwardRef(() => KakaoSearch))
    private kakaoSearch: KakaoSearch,
    @Inject(forwardRef(() => EventTimer))
    private eventTimer: EventTimer,
  ) {}

  async addNewEvent(event) {
    this.logger.debug(`Called ${EventService.name} ${this.addNewEvent.name}`);
    await this.kakaoSearch.requestSearchByPlace(event).catch((err) => {
      this.logger.warn(err);
    });
  }

  async insertToEvent(event, searchByPlace: SearchByPlaceDto) {
    this.logger.debug(`Called ${EventService.name} ${this.insertToEvent.name}`);
    const result = await this.eventRepository.insertToEventIfExists(
      event,
      searchByPlace,
    );
    if (result) {
      await this.eventTimer.setDeleteEventTimer(result.title, result.endDate);
    }
  }

  async deleteEvent(title: string): Promise<void> {
    this.logger.debug(`Called ${EventService.name} ${this.deleteEvent.name}`);
    await this.eventRepository.deleteEvent(title);
  }
}
