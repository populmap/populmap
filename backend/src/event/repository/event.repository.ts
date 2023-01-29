import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventDetail from 'src/entities/event.detail.entity';
import Event from 'src/entities/event.entity';
import { Repository } from 'typeorm';
import { IEventRepository } from './event.repository.interface';
import ProgressType from 'src/enums/progress.type.enum';
import CityType from 'src/enums/city.type.enum';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import { EventDetailResponseDto } from 'src/dto/response/event.detail.response.dto';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { ToolBoxComponent } from 'src/utils/toolbox.component';
import { EventSummaryDto } from 'src/dto/event.summary.dto';
import { EventListDto } from 'src/dto/event.list.dto';
import { EventProgressDto } from 'src/dto/event.progress.dto';
import Bookmark from 'src/entities/bookmark.entity';

export class EventRepository implements IEventRepository {
  private logger = new Logger(EventRepository.name);
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventDetail)
    private eventDetailRepository: Repository<EventDetail>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    private toolBoxComponent: ToolBoxComponent,
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

  async findEventByEventId(eventId: number): Promise<boolean> {
    const result = await this.eventRepository.findOne({
      where: { eventId },
    });
    return result ? true : false;
  }

  async getAllEvents(): Promise<EventProgressDto[]> {
    const results = await this.eventRepository
      .createQueryBuilder('e')
      .select([
        'e.eventId AS e_event_id',
        'ed.beginTime AS ed_begin_time',
        'ed.endTime AS ed_end_time',
        'e.progress AS e_progress',
      ])
      .leftJoin('e.eventDetail', 'ed', 'ed.eventId = e.eventId')
      .getRawMany();
    return results.map((result) => {
      return {
        eventId: result.e_event_id,
        beginTime: result.ed_begin_time,
        endTime: result.ed_end_time,
        progress: result.e_progress,
      };
    }) as EventProgressDto[];
  }

  async updateEventProgress(
    eventId: number,
    progress: ProgressType,
  ): Promise<void> {
    await this.eventRepository
      .createQueryBuilder()
      .update(Event)
      .set({ progress })
      .where('eventId = :eventId', { eventId })
      .execute();
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
      title: this.toolBoxComponent.decodeHtmlEntity(item['eventNm']._text),
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
    const beginTime = new Date(
      item['eventStartDate']._text + ':' + item['eventStartTime']._text,
    );
    const endTime = new Date(
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
      description: this.toolBoxComponent.decodeHtmlEntity(
        item['eventCo']._text,
      ),
      fee: item['admfee']._text,
      beginTime,
      endTime,
      modifiedTime: item['referenceDate']._text,
      url: url ? url : null,
      place: this.toolBoxComponent.decodeHtmlEntity(item['opar']._text),
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
        title: this.toolBoxComponent.decodeHtmlEntity(item['eventNm']._text),
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
    const beginTime = new Date(
      item['eventStartDate']._text + ':' + item['eventStartTime']._text,
    );
    const endTime = new Date(
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
        description: this.toolBoxComponent.decodeHtmlEntity(
          item['eventCo']._text,
        ),
        fee: item['admfee']._text,
        beginTime,
        endTime,
        modifiedTime: item['referenceDate']._text,
        url: url ? url : null,
        place: this.toolBoxComponent.decodeHtmlEntity(item['opar']._text),
      })
      .where('eventId = :eventId', { eventId })
      .execute();
  }

  async getEventSummary(
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]> {
    if (!city) {
      city = CityType.ALL;
    }
    if (!progress) {
      progress = ProgressType.ALL;
    }
    const isBookmarked = await this.bookmarkRepository.findOne({
      where: {
        bookmarkUserId: userId,
      },
    });

    const results = await this.eventRepository
      .createQueryBuilder('e')
      .select([
        'e.eventId as e_event_id',
        'e.title as e_title',
        'e.address as e_address',
        'e.lat as e_lat',
        'e.lng as e_lng',
        'e.progress as e_progress',
      ])
      .where('e.city LIKE :city', {
        city: city === CityType.ALL ? '%' : city,
      })
      .andWhere('e.progress LIKE :progress', {
        progress: progress === ProgressType.ALL ? '%' : progress,
      })
      .getRawMany();
    const eventSummaries = results.map((result) => {
      return {
        eventId: result.e_event_id,
        title: result.e_title,
        address: result.e_address,
        lat: result.e_lat,
        lng: result.e_lng,
        progress: result.e_progress,
        isBookmarked:
          isBookmarked && isBookmarked.bookmarkEventId === result.e_event_id
            ? true
            : false,
      } as EventSummaryDto;
    });
    // eventSummaries에서 lat과 lng가 같은 object의 배열을 eventGroupResponse의 하나의 프로퍼티로 넣는다.
    const eventGroupResponse = this.toolBoxComponent.groupBy(
      eventSummaries,
      function (item: any) {
        return [item.lat, item.lng];
      },
    );
    return eventGroupResponse.map((eventGroup) => {
      return {
        lat: eventGroup[0].lat,
        lng: eventGroup[0].lng,
        eventSummaries: eventGroup,
      };
    });
  }

  async getEventDetailByEventId(
    eventId: number,
  ): Promise<EventDetailResponseDto> {
    const result = await this.eventDetailRepository
      .createQueryBuilder('ed')
      .leftJoinAndSelect('ed.event', 'e', 'ed.eventId = e.eventId')
      .where('ed.eventId = :eventId', { eventId })
      .getOne();
    if (!result) {
      return null;
    }
    return {
      eventId: result.eventId,
      title: result.event.title,
      address: result.event.address,
      lat: result.event.lat,
      lng: result.event.lng,
      call: result.call,
      description: result.description,
      fee: result.fee,
      beginTime: result.beginTime,
      endTime: result.endTime,
      modifiedTime: result.modifiedTime,
      progress: result.event.progress,
      place: result.place,
      url: result.url,
    };
  }

  async getEventList(
    page: number,
    length: number,
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto> {
    if (!city) {
      city = CityType.ALL;
    }
    if (!progress) {
      progress = ProgressType.ALL;
    }
    const isBookmarked = await this.bookmarkRepository.findOne({
      where: {
        bookmarkUserId: userId,
      },
    });

    const results = await this.eventRepository
      .createQueryBuilder('e')
      .select([
        'e.eventId as e_event_id',
        'e.title as e_title',
        'e.address as e_address',
        'ed.beginTime as ed_begin_time',
        'ed.endTime as ed_end_time',
        'ed.call as ed_call',
        'e.progress as e_progress',
        'COUNT(*) OVER () AS cnt',
      ])
      .leftJoin('e.eventDetail', 'ed', 'e.eventId = ed.eventId')
      .where('city LIKE :city', {
        city: city === CityType.ALL ? '%' : city,
      })
      .andWhere('progress LIKE :progress', {
        progress: progress === ProgressType.ALL ? '%' : progress,
      })
      .limit(length)
      .offset(page * length)
      .orderBy('e.eventId', 'ASC')
      .execute();
    return {
      eventLists: results.map((result) => {
        return {
          eventId: result.e_event_id,
          title: result.e_title,
          address: result.e_address,
          beginTime: result.ed_begin_time,
          endTime: result.ed_end_time,
          call: result.ed_call,
          progress: result.e_progress,
          isBookmarked:
            isBookmarked && isBookmarked.bookmarkEventId === result.e_event_id
              ? true
              : false,
        } as EventListDto;
      }),
      totalLength: results.length > 0 ? Number(results[0].cnt) : 0,
    };
  }
}
