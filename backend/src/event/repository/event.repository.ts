import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventDetail from 'src/entities/event.detail.entity';
import Event from 'src/entities/event.entity';
import { Repository } from 'typeorm';
import { IEventRepository } from './event.repository.interface';
import ProgressType from 'src/enums/progress.type.enum';
import CityType from 'src/enums/city.type.enum';
import { EventSummaryResponseDto } from 'src/dto/response/event.summary.response.dto';

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
    // address parsing
    let address: string = null;
    if (item['rdnmadr'].length !== 0) {
      address = String(item['rdnmadr']._text);
      if (address === 'undefined') {
        address = null;
      }
    } else if (item['lnmadr'].length !== 0) {
      address = String(item['lnmadr']._text);
      if (address === 'undefined') {
        address = null;
      }
    }

    // progress parsing
    let progress = ProgressType.BEFOREPROGRESS;
    if (new Date() > new Date(item['eventEndDate']._text)) {
      progress = ProgressType.INPROGRESS;
    } else if (new Date() > new Date(item['eventStartDate']._text)) {
      progress = ProgressType.AFTERPROGRESS;
    }

    // city parsing
    let city: CityType = CityType.NONE;
    if (address) {
      const cityIndex = address.indexOf(' ');
      const cityString = address.substring(0, cityIndex);
      for (const [key, value] of Object.entries(CityType)) {
        if (value === cityString) {
          city = CityType[key];
          break;
        }
      }
    }

    const result = await this.eventRepository.insert({
      title: item['eventNm']._text,
      address: address ? address : null,
      lat: item['latitude']._text,
      lng: item['longitude']._text,
      progress,
      city,
    });
    return result.identifiers[0].eventId;
  }

  async insertEventDetail(eventId: number, item: any): Promise<void> {
    // date parsing
    const beginDate = new Date(
      item['eventStartDate']._text + ':' + item['eventStartTime']._text,
    );
    const endDate = new Date(
      item['eventEndDate']._text + ':' + item['eventEndTime']._text,
    );

    // url parsing
    let url: string = null;
    if (item['homepageUrl'].length !== 0) {
      url = String(item['homepageUrl']._text);
      if (url === 'undefined') {
        url = null;
      }
    } else if (item['advantkInfo'].length !== 0) {
      url = String(item['advantkInfo']._text);
      if (url === 'undefined') {
        url = null;
      }
    }
    // remove url이 http:// 나 https:// 로 시작하는 경우 삭제
    if (url && url.startsWith('http://')) {
      url = url.replace('http://', '');
    } else if (url && url.startsWith('https://')) {
      url = url.replace('https://', '');
    }

    await this.eventDetailRepository.insert({
      eventId,
      call: item['phoneNumber']._text,
      description: item['eventCo']._text,
      fee: item['admfee']._text,
      beginDate,
      endDate,
      modifiedDate: item['referenceDate']._text,
      url: url ? url : null,
      place: item['opar']._text,
    });
  }

  async updateEvent(eventId: number, item: any): Promise<void> {
    // address parsing
    let address: string = null;
    if (item['rdnmadr'].length !== 0) {
      address = String(item['rdnmadr']._text);
      if (address === 'undefined') {
        address = null;
      }
    } else if (item['lnmadr'].length !== 0) {
      address = String(item['lnmadr']._text);
    }

    // progress parsing
    let progress = ProgressType.BEFOREPROGRESS;
    if (new Date() > new Date(item['eventEndDate']._text)) {
      progress = ProgressType.INPROGRESS;
    } else if (new Date() > new Date(item['eventStartDate']._text)) {
      progress = ProgressType.AFTERPROGRESS;
    }

    // city parsing
    let city: CityType = CityType.NONE;
    if (address) {
      const cityIndex = address.indexOf(' ');
      const cityString = address.substring(0, cityIndex);
      for (const [key, value] of Object.entries(CityType)) {
        if (value === cityString) {
          city = CityType[key];
          break;
        }
      }
    }

    await this.eventRepository
      .createQueryBuilder()
      .update(Event)
      .set({
        title: item['eventNm']._text,
        address: address ? address : null,
        lat: item['latitude']._text,
        lng: item['longitude']._text,
        progress,
        city,
      })
      .where('eventId = :eventId', { eventId })
      .execute();
  }

  async updateEventDetail(eventId: number, item: any): Promise<void> {
    // date parsing
    const beginDate = new Date(
      item['eventStartDate']._text + ':' + item['eventStartTime']._text,
    );
    const endDate = new Date(
      item['eventEndDate']._text + ':' + item['eventEndTime']._text,
    );

    // url parsing
    let url: string = null;
    if (item['homepageUrl'].length !== 0) {
      url = String(item['homepageUrl']._text);
      if (url === 'undefined') {
        url = null;
      }
    } else if (item['advantkInfo'].length !== 0) {
      url = String(item['advantkInfo']._text);
      if (url === 'undefined') {
        url = null;
      }
    }
    // remove url이 http:// 나 https:// 로 시작하는 경우 삭제
    if (url && url.startsWith('http://')) {
      url = url.replace('http://', '');
    } else if (url && url.startsWith('https://')) {
      url = url.replace('https://', '');
    }

    await this.eventDetailRepository
      .createQueryBuilder()
      .update(EventDetail)
      .set({
        call: item['phoneNumber']._text,
        description: item['eventCo']._text,
        fee: item['admfee']._text,
        beginDate,
        endDate,
        modifiedDate: item['referenceDate']._text,
        url: url ? url : null,
        place: item['opar']._text,
      })
      .where('eventId = :eventId', { eventId })
      .execute();
  }

  async getEventSummary(
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryResponseDto[]> {
    const results = await this.eventRepository
      .createQueryBuilder()
      .where('city LIKE :city', { city: city ? city : '%' })
      .andWhere('progress LIKE :progress', {
        progress: progress ? progress : '%',
      })
      .getMany();
    return results.map((result) => {
      return {
        eventId: result.eventId,
        title: result.title,
        address: result.address,
        lat: result.lat,
        lng: result.lng,
        progress: result.progress,
      };
    });
  }
}
