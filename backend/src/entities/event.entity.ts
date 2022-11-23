import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EventDetail from "./event.detail";

@Entity('event')
export default class Event {
  @PrimaryGeneratedColumn({
    name: 'event_id',
  })
  eventId: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 32,
  })
  type: string;

  @Column({
    name: 'disctrict',
    type: 'varchar',
    length: 16,
  })
  disctrict: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 128,
  })
  address: string;

  @Column({
    name: 'lat',
    type: 'double',
  })
  lat: string;

  @Column({
    name: 'lng',
    type: 'double',
  })
  lng: string;

  @OneToOne(() => EventDetail, (eventDetail) => eventDetail.event)
  eventDetail: EventDetail;
}
