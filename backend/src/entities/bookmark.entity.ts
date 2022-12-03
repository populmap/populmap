import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Event from "./event.entity";
import User from "./user.entity";

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

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @ManyToOne(() => Event, (event) => event.bookmarks)
  event: Event;
}
