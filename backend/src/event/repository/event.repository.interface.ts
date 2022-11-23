import { SearchByPlaceDto } from 'src/dto/search.by.place.dto';

export interface IEventRepository {
  /**
   * DB에 존재하지 않는 행사라면 event 테이블에 삽입한다.
   * 관계를 갖고 있는 event_detail 테이블에도 삽입한다.
   * 존재하거나 삽입에 성공하면 title, endDate를 반환한다.
   * @param event
   * @param searchByPlace
   */
  insertToEventIfExists(
    event,
    searchByPlace: SearchByPlaceDto,
  ): Promise<{ title: string; endDate: Date }>;

  /**
   * 행사 정보를 event 테이블에서 삭제한다.
   * @param title
   */
  deleteEvent(title: string): Promise<void>;
}
