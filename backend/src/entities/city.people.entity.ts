import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import City from "./city.entity";

@Entity("city_people")
export default class CityPeople {
  @PrimaryGeneratedColumn({
    name: 'people_id',
    type: 'int',
  })
  peopleId: number;

  @Column({
    name: 'people_city_id',
    type: 'int',
    unique: true,
  })
  peopleCityId: number;

  @Column({
    name: 'density_level',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  densityLevel: string;

  @Column({
    name: 'message',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  message: string;

  @Column({
    name: 'density_min',
    type: 'int',
    nullable: true,
  })
  densityMin: number;

  @Column({
    name: 'density_max',
    type: 'int',
    nullable: true,
  })
  densityMax: number;

  @Column({
    name: 'resident_ratio',
    type: 'int',
    nullable: true,
  })
  residentRatio: number;

  @Column({
    name: 'nonresident_ratio',
    type: 'int',
    nullable: true,
  })
  nonResidentRatio: number;

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
    name: 'update_time',
    type: 'datetime',
    nullable: true,
  })
  updateTime: Date;

  @OneToOne(() => City)
  @JoinColumn({
    name: 'people_city_id',
  })
  city: City;
}
