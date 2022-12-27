import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bookmark from 'src/entities/bookmark.entity';
import { Repository } from 'typeorm';
import { IBookmarkRepository } from './bookmark.repository.interface';

export class BookmarkRepository implements IBookmarkRepository {
  private logger = new Logger(BookmarkRepository.name);
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
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
