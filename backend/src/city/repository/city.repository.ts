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

  async getCityIdIfExists(place: string, type: string): Promise<number> {
    const result = await this.cityRepository.findOne({
      where: { place, type },
      select: {
        cityId: true,
      },
    });
    return result ? result.cityId : null;
  }

  async insertCity(place: string, type: string): Promise<number> {
    const result = await this.cityRepository.createQueryBuilder()
      .insert()
      .into(City)
      .values({ place, type })
      .execute();
    return result.identifiers[0].cityId;
  }

  async insertCityPeople(cityId: number, lat: number, lng: number, parsed: any): Promise<void> {
    await this.cityPeopleRepository.createQueryBuilder()
      .insert()
      .into(CityPeople)
      .values({
        peopleCityId: cityId,
        densityLevel: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_LVL,
        message: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_MSG,
        densityMin: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_PPLTN_MIN,
        densityMax: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_PPLTN_MAX,
        residentRatio: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.RESNT_PPLTN_RATE,
        nonResidentRatio: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.NON_RESNT_PPLTN_RATE,
        lat,
        lng,
        updateTime: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.PPLTN_TIME,
      })
      .execute();
  }

  async insertCityRoad(cityId: number, parsed: any): Promise<void> {
    await this.cityRoadRepository.createQueryBuilder()
      .insert()
      .into(CityRoad)
      .values({
        roadCityId: cityId,
        densityLevel: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_IDX,
        message: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_MSG,
        speed: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_SPD,
        updateTime: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRFFIC_TIME,
      })
      .execute();
  }

  async insertCityAccident(cityId: number, parsed: any): Promise<void> {
    await this.cityAccidentRepository.createQueryBuilder()
      .insert()
      .into(CityAccident)
      .values({
        accidentCityId: cityId,
        beginTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_OCCR_DT,
        endTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.EXP_CLR_DT,
        type: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_TYPE,
        detailType: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_DTYPE,
        lat: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_X,
        lng: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_Y,
        updateTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_TIME,
      })
      .execute();
  }

  async updateCityPeople(cityId: number, parsed): Promise<void> {
    await this.cityPeopleRepository.createQueryBuilder()
      .update(CityPeople)
      .set({
        densityLevel: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_LVL,
        message: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_CONGEST_MSG,
        densityMin: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_PPLTN_MIN,
        densityMax: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.AREA_PPLTN_MAX,
        residentRatio: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.RESNT_PPLTN_RATE,
        nonResidentRatio: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.NON_RESNT_PPLTN_RATE,
        updateTime: parsed.CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS.PPLTN_TIME,
      })
      .where({
        peopleCityId: cityId,
      })
      .execute();
  }

  async updateCityRoad(cityId: number, parsed): Promise<void> {
    await this.cityRoadRepository.createQueryBuilder()
      .update(CityRoad)
      .set({
        densityLevel: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_IDX,
        message: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_MSG,
        speed: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRAFFIC_SPD,
        updateTime: parsed.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA.ROAD_TRFFIC_TIME,
      })
      .where({
        roadCityId: cityId,
      })
      .execute();
  }

  async updateCityAccident(cityId: number, parsed): Promise<void> {
    await this.cityAccidentRepository.createQueryBuilder()
      .update(CityAccident)
      .set({
        beginTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_OCCR_DT,
        endTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.EXP_CLR_DT,
        type: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_TYPE,
        detailType: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_DTYPE,
        lat: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_X,
        lng: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_Y,
        updateTime: parsed.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS.ACDNT_TIME,
      })
      .where({
        accidentCityId: cityId,
      })
      .execute();
  }
}
