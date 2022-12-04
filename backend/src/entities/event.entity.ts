import ProgressType from 'src/enums/progress.type.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bookmark from './bookmark.entity';
import EventDetail from './event.detail.entity';

@Entity('event')
export default class Event {
  @PrimaryGeneratedColumn({
    name: 'event_id',
  })
  eventId: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  title: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  address: string;

  @Column({
    name: 'lat',
    type: 'double',
    nullable: true,
  })
  lat: number;

  @Column({
    name: 'lng',
    type: 'double',
    nullable: true,
  })
  lng: number;

  @Column({
    name: 'progress',
    type: 'enum',
    enum: ProgressType,
  })
  progress: ProgressType;

  @OneToOne(() => EventDetail, (eventDetail) => eventDetail.event)
  eventDetail: EventDetail;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.event)
  bookmarks: Bookmark[];
}
