import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Event from "./event.entity";

@Entity('event_detail')
export default class EventDetail {
  @PrimaryGeneratedColumn({
    name: 'event_detail_id',
  })
  eventDetailId: number;

  @OneToOne(() => Event)
  @JoinColumn({
    name: 'event_id',
  })
  event: Event;
}
