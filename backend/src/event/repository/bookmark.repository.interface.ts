import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';

export interface IBookmarkRepository {
  /**
   * eventId와 userId에 해당하는 북마크를 찾는다.
   * @param eventId
   * @param userId
   */
  findBookmark(eventId: number, userId: number): Promise<boolean>;

  /**
   * userId에 해당하는 유저의 북마크에서 city와 progress에 해당하는 eventSummary 정보를 반환한다
   * @param userId
   * @param city
   * @param progress
   */
  getEventSummaryOfBookmark(
    userId: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]>;

  /**
   * userId에 해당하는 유저의 북마크에서 city와 progress에 해당하는 eventList를 반환한다.
   * page length를 이용하여 pagination을 적용한다.
   * @param userId
   * @param page
   * @param length
   * @param city
   * @param progress
   */
  getEventListOfBookmark(
    userId: number,
    page: number,
    length: number,
    city?: CityType,
    progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto>;

  /**
   * eventId와 userId에 해당하는 북마크를 생성한다.
   * @param eventId
   * @param userId
   */
  postBookmark(eventId: number, userId: number): Promise<void>;

  /**
   * eventId와 userId에 해당하는 북마크를 삭제한다.
   * @param eventId
   * @param userId
   */
  deleteBookmark(eventId: number, userId: number): Promise<void>;
}
