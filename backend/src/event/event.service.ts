import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventRepository } from './repository/event.repository';
import {
  IsolationLevel,
  Propagation,
  Transactional,
  runOnTransactionComplete,
} from 'typeorm-transactional';
import { EventProgressDto } from 'src/dto/event.progress.dto';
import ProgressType from 'src/enums/progress.type.enum';

@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);
  constructor(
    @Inject('IEventRepository') private eventRepository: EventRepository,
  ) {}

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.REPEATABLE_READ,
  })
  async putEventInformationData(item: any): Promise<void> {
    this.logger.debug(`Called ${this.putEventInformationData.name}`);
    const eventId = await this.eventRepository.getEventIdIfExists(
      String(item['eventNm']._text),
    );
    if (!eventId) {
      await this.insertEventInformationData(item);
    } else {
      await this.updateEventInformationData(eventId, item);
    }
    runOnTransactionComplete((err) => err && this.logger.error(err));
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.REPEATABLE_READ,
  })
  async insertEventInformationData(item: any) {
    this.logger.debug(`Called ${this.insertEventInformationData.name}`);
    const eventId = await this.eventRepository.insertEvent(item);
    await this.eventRepository.insertEventDetail(eventId, item);
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.REPEATABLE_READ,
  })
  async updateEventInformationData(eventId: number, item: any) {
    this.logger.debug(`Called ${this.updateEventInformationData.name}`);
    await this.eventRepository.updateEvent(eventId, item);
    await this.eventRepository.updateEventDetail(eventId, item);
  }

  async findEvent(eventId: number): Promise<boolean> {
    this.logger.debug(`Called ${this.findEvent.name}`);
    try {
      return await this.eventRepository.findEventByEventId(eventId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getAllEvents(): Promise<EventProgressDto[]> {
    this.logger.debug(`Called ${this.getAllEvents.name}`);
    try {
      return await this.eventRepository.getAllEvents();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateEventProgress(
    eventId: number,
    progress: ProgressType,
  ): Promise<void> {
    this.logger.debug(`Called ${this.updateEventProgress.name}`);
    try {
      await this.eventRepository.updateEventProgress(eventId, progress);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
