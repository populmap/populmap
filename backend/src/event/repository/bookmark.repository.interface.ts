export interface IBookmarkRepository {
  /**
   * eventId와 userId에 해당하는 북마크를 찾는다.
   * @param eventId
   * @param userId
   */
  findBookmark(eventId: number, userId: number): Promise<boolean>;

  /**
   * eventId와 userId에 해당하는 북마크를 생성한다.
   * @param eventId
   * @param userId
   */
  postBookmark(eventId: number, userId: number): Promise<void>;
}
