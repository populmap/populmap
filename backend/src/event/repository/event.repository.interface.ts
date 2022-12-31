import { EventProgressDto } from 'src/dto/event.progress.dto';
import { EventDetailResponseDto } from 'src/dto/response/event.detail.response.dto';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';

export interface IEventRepository {
  /**
   * title이 존재한다면 해당 event의 id를 반환한다.
   * @param title
   */
  getEventIdIfExists(title: string): Promise<number>;

  /**
   * eventId에 해당하는 행사가 존재하는지 확인한다.
   * @param eventId
   */
  findEventByEventId(eventId: number): Promise<boolean>;

  /**
   * 모든 행사 정보를 반환한다.
   */
  getAllEvents(): Promise<EventProgressDto[]>;

  /**
   * event progress를 업데이트한다.
   * @param eventId
   * @param progress
   */
  updateEventProgress(eventId: number, progress: ProgressType): Promise<void>;

  /**
   * 해당 item을 이용하여 event를 생성하고, 생성된 event의 id를 반환한다.
   * @param item
   */
  insertEvent(item: any): Promise<number>;

  /**
   * eventId와 item을 이용하여 eventDetail을 생성한다.
   * @param eventId
   * @param item
   */
  insertEventDetail(eventId: number, item: any): Promise<void>;

  /**
   * eventId와 item을 이용하여 event를 업데이트한다.
   * @param eventId
   * @param item
   */
  updateEvent(eventId: number, item: any): Promise<void>;

  /**
   * eventId와 item을 이용하여 eventDetail을 업데이트한다.
   * @param eventId
   * @param item
   */
  updateEventDetail(eventId: number, item: any): Promise<void>;

  /**
   * city와 progress에 해당하는 eventSummary 정보를 반환한다.
   * @param userId
   * @param city
   * @param progress
   */
  getEventSummary(
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]>;

  /**
   * eventId에 해당하는 eventDetail 정보를 반환한다.
   * @param eventId
   */
  getEventDetailByEventId(eventId: number): Promise<EventDetailResponseDto>;

  /**
   * city와 progress에 해당하는 eventList를 반환한다.
   * page length를 이용하여 pagination을 적용한다.
   * @param page
   * @param length
   * @param userId
   * @param city
   * @param progress
   */
  getEventList(
    page: number,
    length: number,
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto>;
}
