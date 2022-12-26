import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventDetail from 'src/entities/event.detail.entity';
import Event from 'src/entities/event.entity';
import { Repository } from 'typeorm';
import { IEventRepository } from './event.repository.interface';
import ProgressType from 'src/enums/progress.type.enum';

export class EventRepository implements IEventRepository {
  private logger = new Logger(EventRepository.name);
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventDetail)
    private eventDetailRepository: Repository<EventDetail>,
  ) {}

  async getEventIdIfExists(title: string): Promise<number> {
    const result = await this.eventRepository.findOne({
      where: { title },
      select: {
        eventId: true,
      },
    });
    return result ? result.eventId : null;
  }

  async insertEvent(item: any): Promise<number> {
    let address = null;
    if (item.rdnmadr) {
      address = item.rdnmadr._text;
    } else if (item.lnmadr) {
      address = item.lnmadr._text;
    }
    let progress = ProgressType.BEFOREPROGRESS;
    if (new Date() > new Date(item.eventEndDt._text)) {
      progress = ProgressType.INPROGRESS;
    } else if (new Date() > new Date(item.eventStartDt._text)) {
      progress = ProgressType.AFTERPROGRESS;
    }
    const result = await this.eventRepository.insert({
      title: item.eventNm._text,
      address,
      lat: item.latitude,
      lng: item.longitude,
      progress,
    });
    return result.identifiers[0].eventId;
  }

  async insertEventDetail(eventId: number, item: any): Promise<void> {
    const beginDate = new Date(
      item.eventStartDate._text + ':' + item.eventStartTime._text,
    );
    const endDate = new Date(
      item.eventEndDate._text + ':' + item.eventEndTime._text,
    );
    let url = null;
    if (item.homepageUrl) {
      url = item.homepageUrl._text;
    } else if (item.advantkInfo) {
      url = item.advantkInfo._text;
    }
    await this.eventDetailRepository.insert({
      eventId,
      call: item.phoneNumber._text,
      description: item.eventCo._text,
      fee: item.admfee._text,
      beginDate,
      endDate,
      modifiedDate: item.referenceDate._text,
      url,
      place: item.opar._text,
    });
  }

  async updateEvent(eventId: number, item: any): Promise<void> {
    let address = null;
    if (item.rdnmadr) {
      address = item.rdnmadr._text;
    } else if (item.lnmadr) {
      address = item.lnmadr._text;
    }
    let progress = ProgressType.BEFOREPROGRESS;
    if (new Date() > new Date(item.eventEndDt._text)) {
      progress = ProgressType.INPROGRESS;
    } else if (new Date() > new Date(item.eventStartDt._text)) {
      progress = ProgressType.AFTERPROGRESS;
    }
    await this.eventRepository
      .createQueryBuilder()
      .update(Event)
      .set({
        title: item.eventNm._text,
        address,
        lat: item.latitude,
        lng: item.longitude,
        progress,
      })
      .where('eventId = :eventId', { eventId })
      .execute();
  }

  async updateEventDetail(eventId: number, item: any): Promise<void> {
    const beginDate = new Date(
      item.eventStartDate._text + ':' + item.eventStartTime._text,
    );
    const endDate = new Date(
      item.eventEndDate._text + ':' + item.eventEndTime._text,
    );
    let url = null;
    if (item.homepageUrl) {
      url = item.homepageUrl._text;
    } else if (item.advantkInfo) {
      url = item.advantkInfo._text;
    }
    await this.eventDetailRepository
      .createQueryBuilder()
      .update(EventDetail)
      .set({
        call: item.phoneNumber._text,
        description: item.eventCo._text,
        fee: item.admfee._text,
        beginDate,
        endDate,
        modifiedDate: item.referenceDate._text,
        url,
        place: item.opar._text,
      })
      .where('eventId = :eventId', { eventId })
      .execute();
  }
}
