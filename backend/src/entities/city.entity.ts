import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import CityAccident from './city.accident.entity';
import CityPeople from './city.people.entity';
import CityRoad from './city.road.entity';

@Entity('city')
export default class City {
  @PrimaryGeneratedColumn({
    name: 'city_id',
  })
  cityId: number;

  @Column({
    name: 'place',
    type: 'varchar',
    length: 64,
  })
  place: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 64,
  })
  type: string;

  @OneToOne(() => CityPeople, (cityPeople) => cityPeople.city)
  cityPeople: CityPeople | null;

  @OneToOne(() => CityRoad, (cityRoad) => cityRoad.city)
  cityRoad: CityRoad | null;

  @OneToOne(() => CityAccident, (cityAccident) => cityAccident.city)
  cityAccident: CityAccident | null;
}
