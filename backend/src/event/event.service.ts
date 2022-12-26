import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventRepository } from './repository/event.repository';

@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);
  constructor(
    @Inject('IEventRepository') private eventRepository: EventRepository,
  ) {}

  async putEventInformationData(item: any): Promise<void> {
    this.logger.debug(`Called ${this.putEventInformationData.name}`);
    try {
      const eventId = await this.eventRepository.getEventIdIfExists(
        String(item.eventNm._text),
      );
      if (!eventId) {
        await this.insertEventInformationData(item);
      } else {
        await this.updateEventInformationData(eventId, item);
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async insertEventInformationData(item: any) {
    this.logger.debug(`Called ${this.insertEventInformationData.name}`);
    try {
      const eventId = await this.eventRepository.insertEvent(item);
      await this.eventRepository.insertEventDetail(eventId, item);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateEventInformationData(eventId: number, item: any) {
    this.logger.debug(`Called ${this.updateEventInformationData.name}`);
    try {
      await this.eventRepository.updateEvent(eventId, item);
      await this.eventRepository.updateEventDetail(eventId, item);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
