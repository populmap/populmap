import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CityAccident from "src/entities/city.accident.entity";
import City from "src/entities/city.entity";
import CityPeople from "src/entities/city.people.entity";
import CityRoad from "src/entities/city.road.entity";
import { Repository } from "typeorm";
import { ICityRepository } from "./city.repository.interface";

export class CityRepository implements ICityRepository {
  private logger = new Logger(CityRepository.name);
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(CityPeople)
    private cityPeopleRepository: Repository<CityPeople>,
    @InjectRepository(CityRoad)
    private cityRoadRepository: Repository<CityRoad>,
    @InjectRepository(CityAccident)
    private cityAccidentRepository: Repository<CityAccident>,
  ) {}


}
