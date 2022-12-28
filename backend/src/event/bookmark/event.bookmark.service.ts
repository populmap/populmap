import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { IBookmarkRepository } from '../repository/bookmark.repository.interface';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { EventService } from '../event.service';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';

@Injectable()
export class EventBookmarkService {
  private logger = new Logger(EventBookmarkService.name);

  constructor(
    @Inject('IBookmarkRepository')
    private bookmarkRepository: IBookmarkRepository,
    private eventService: EventService,
  ) {}

  async getEventSummaryOfBookmark(
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummaryOfBookmark.name}`);
    try {
      return await this.bookmarkRepository.getEventSummaryOfBookmark(
        userId,
        city,
        progress,
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async postBookmark(eventId: number, userId): Promise<void> {
    this.logger.debug(`Called ${this.postBookmark.name}`);
    try {
      if (!(await this.eventService.findEvent(eventId))) {
        throw new ConflictException(`🚨 해당 이벤트가 존재하지 않습니다 🥲 🚨`);
      }
      if (await this.bookmarkRepository.findBookmark(eventId, userId)) {
        throw new ConflictException(`🚨 이미 북마크한 이벤트입니다 🥲 🚨`);
      }
      return await this.bookmarkRepository.postBookmark(eventId, userId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
