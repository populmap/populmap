import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import City from "./city.entity";

@Entity("city_road")
export default class CityRoad {
  @PrimaryGeneratedColumn({
    name: 'road_id',
    type: 'int',
  })
  roadId: number;

  @Column({
    name: 'road_city_id',
    type: 'int',
    unique: true,
  })
  roadCityId: number;

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
    name: 'speed',
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  speed: string;

  @OneToOne(() => City)
  @JoinColumn({
    name: 'road_city_id',
  })
  city: City;
}
