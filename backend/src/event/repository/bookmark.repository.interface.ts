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
   * eventId와 userId에 해당하는 북마크를 생성한다.
   * @param eventId
   * @param userId
   */
  postBookmark(eventId: number, userId: number): Promise<void>;
}
