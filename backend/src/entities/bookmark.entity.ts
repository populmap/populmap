import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './event.entity';
import User from './user.entity';

@Entity('bookmark')
export default class Bookmark {
  @PrimaryGeneratedColumn({
    name: 'bookmark_id',
  })
  bookmarkId: number;

  @Column({
    name: 'bookmark_user_id',
    type: 'int',
  })
  bookmarkUserId: number;

  @Column({
    name: 'bookmark_event_id',
    type: 'int',
  })
  bookmarkEventId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({
    name: 'bookmark_user_id',
  })
  user: User;

  @ManyToOne(() => Event, (event) => event.eventId)
  @JoinColumn({
    name: 'bookmark_event_id',
  })
  event: Event;
}
