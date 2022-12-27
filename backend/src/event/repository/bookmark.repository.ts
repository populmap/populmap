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
}
