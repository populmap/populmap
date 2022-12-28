import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';
import { IEventRepository } from '../repository/event.repository.interface';
import { EventDetailResponseDto } from 'src/dto/response/event.detail.response.dto';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { IBookmarkRepository } from '../repository/bookmark.repository.interface';
import { EventBookmarkService } from '../bookmark/event.bookmark.service';

@Injectable()
export class EventSearchService {
  private logger = new Logger(EventSearchService.name);
  constructor(
    @Inject('IEventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async getEventSummary(
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummary.name}`);
    try {
      return await this.eventRepository.getEventSummary(userId, city, progress);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getEventDetail(eventId: number): Promise<EventDetailResponseDto> {
    this.logger.debug(`Called ${this.getEventDetail.name}`);
    try {
      const result = await this.eventRepository.getEventDetailByEventId(
        eventId,
      );
      if (!result) {
        throw new NotFoundException(`🚨 존재하지 않는 이벤트입니다 🥲 🚨`);
      }
      return result;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getEventList(
    page: number,
    length: number,
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto> {
    this.logger.debug(`Called ${this.getEventList.name}`);
    try {
      return await this.eventRepository.getEventList(
        page,
        length,
        userId,
        city,
        progress,
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
