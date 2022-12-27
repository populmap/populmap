import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventSummaryResponseDto } from 'src/dto/response/event.summary.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';
import { IEventRepository } from '../repository/event.repository.interface';

@Injectable()
export class EventSearchService {
  private logger = new Logger(EventSearchService.name);
  constructor(
    @Inject('IEventRepository') private eventRepository: IEventRepository,
  ) {}

  async getEventSummary(
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummary.name}`);
    try {
      return await this.eventRepository.getEventSummary(city, progress);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
