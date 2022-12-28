import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bookmark from 'src/entities/bookmark.entity';
import { Repository } from 'typeorm';
import { IBookmarkRepository } from './bookmark.repository.interface';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import { ToolBoxComponent } from 'src/utils/toolbox.component';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';

export class BookmarkRepository implements IBookmarkRepository {
  private logger = new Logger(BookmarkRepository.name);
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    private toolBoxComponent: ToolBoxComponent,
  ) {}

  async findBookmark(eventId: number, userId: number): Promise<boolean> {
    const result = await this.bookmarkRepository.findOne({
      where: {
        bookmarkEventId: eventId,
        bookmarkUserId: userId,
      },
      select: {
        bookmarkId: true,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  }

  async getEventSummaryOfBookmark(
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
    // userId로 bookmark를 찾고, bookmark에서 eventId를 기준으로 leftJoin하여 event를 찾는다.
    const results = await this.bookmarkRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.event', 'e', 'b.bookmarkEventId = e.eventId')
      .select([
        'e.eventId',
        'e.title',
        'e.address',
        'e.lat',
        'e.lng',
        'e.progress',
      ])
      .where('b.bookmarkUserId = :userId', { userId })
      .andWhere('e.city LIKE :city', {
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
      };
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

  async getEventListOfBookmark(
    userId: number,
    page: number,
    length: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto> {
    if (!city) {
      city = CityType.ALL;
    }
    if (!progress) {
      progress = ProgressType.ALL;
    }
    const results = await this.bookmarkRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.event', 'e', 'b.bookmarkEventId = e.eventId')
      .leftJoinAndSelect('e.eventDetail', 'ed', 'e.eventId = ed.eventId')
      .select([
        'e.eventId',
        'e.title',
        'e.address',
        'ed.beginTime',
        'ed.endTime',
        'ed.call',
        'e.progress',
        'COUNT(*) OVER () AS cnt',
      ])
      .where('b.bookmarkUserId = :userId', { userId })
      .andWhere('city LIKE :city', {
        city: city === CityType.ALL ? '%' : city,
      })
      .andWhere('progress LIKE :progress', {
        progress: progress === ProgressType.ALL ? '%' : progress,
      })
      .limit(length)
      .offset(page * length)
      .orderBy('e.eventId', 'ASC')
      .execute();
    console.log(results);
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
        };
      }),
      totalLength: results.length > 0 ? Number(results[0].cnt) : 0,
    };
  }

  async postBookmark(eventId: number, userId: number): Promise<void> {
    await this.bookmarkRepository
      .createQueryBuilder()
      .insert()
      .into(Bookmark)
      .values({
        bookmarkEventId: eventId,
        bookmarkUserId: userId,
      })
      .execute();
  }
}
