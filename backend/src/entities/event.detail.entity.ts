import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event_detail')
export default class EventDetail {
  @PrimaryGeneratedColumn({
    name: 'event_detail_id',
  })
  eventDetailId: number;

  @Column({
    name: 'event_id',
    type: 'int',
  })
  eventId: number;

  @Column({
    name: 'call',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  call: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'fee',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  fee: string;

  @Column({
    name: 'begin_date',
    type: 'datetime',
    nullable: true,
  })
  beginDate: Date;

  @Column({
    name: 'end_date',
    type: 'datetime',
    nullable: true,
  })
  endDate: Date;

  @Column({
    name: 'modified_date',
    type: 'datetime',
    nullable: true,
  })
  modifiedDate: Date;

  @Column({
    name: 'url',
    type: 'text',
    nullable: true,
  })
  url: string;

  @Column({
    name: 'place',
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  place: string;

  @OneToOne(() => Event)
  @JoinColumn({
    name: 'event_id',
  })
  event: Event;
}
