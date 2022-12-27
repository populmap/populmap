import { EventDetailResponseDto } from 'src/dto/response/event.detail.response.dto';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { EventSummaryResponseDto } from 'src/dto/response/event.summary.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';

export interface IEventRepository {
  /**
   * title이 존재한다면 해당 event의 id를 반환한다.
   * @param title
   */
  getEventIdIfExists(title: string): Promise<number>;

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
   * @param city
   * @param progress
   */
  getEventSummary(
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryResponseDto[]>;

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
   * @param city
   * @param progress
   */
  getEventList(
    page: number,
    length: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto>;
}