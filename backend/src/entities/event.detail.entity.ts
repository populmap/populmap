import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './event.entity';

@Entity('event_detail')
export default class EventDetail {
  @PrimaryGeneratedColumn({
    name: 'event_detail_id',
  })
  eventDetailId: number;

  @Column({
    name: 'begin_date',
    type: 'datetime',
  })
  beginDate: Date;

  @Column({
    name: 'end_date',
    type: 'datetime',
  })
  endDate: Date;

  @Column({
    name: 'org_name',
    type: 'varchar',
    length: 32,
  })
  orgName: string;

  @Column({
    name: 'target',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  target: string;

  @Column({
    name: 'fee',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  fee: string;

  @Column({
    name: 'player_info',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  playerInfo: string;

  @Column({
    name: 'program_info',
    // type: 'varchar',
    // length: 128,
    type: 'text',
    nullable: true,
  })
  programInfo: string;

  @Column({
    name: 'event_description',
    // type: 'varchar',
    // length: 128,
    type: 'text',
    nullable: true,
  })
  eventDescription: string;

  @Column({
    name: 'org_link',
    type: 'text',
    nullable: true,
  })
  orgLink: string;

  @Column({
    name: 'img_link',
    type: 'text',
    nullable: true,
  })
  imgLink: string;

  @Column({
    name: 'event_id',
    type: 'int',
  })
  eventId: number;

  @OneToOne(() => Event)
  @JoinColumn({
    name: 'event_id',
  })
  event: Event;
}
