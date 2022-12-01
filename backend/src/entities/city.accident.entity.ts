import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import City from "./city.entity";

@Entity("city_accident")
export default class CityAccident {
  @PrimaryGeneratedColumn({
    name: 'accident_id',
    type: 'int',
  })
  accidentId: number;

  @Column({
    name: 'accident_city_id',
    type: 'int',
    unique: true,
  })
  accidentCityId: number;

  @Column({
    name: 'begin_time',
    type: 'datetime',
    nullable: true,
  })
  beginTime: Date;

  @Column({
    name: 'end_time',
    type: 'datetime',
    nullable: true,
  })
  endTime: Date;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  type: string;

  @Column({
    name: 'detail_type',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  detailType: string;

  @OneToOne(() => City)
  @JoinColumn({
    name: 'accident_city_id',
  })
  city: City;
}
