import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityAccidentResponseDto } from 'src/dto/response/city.accident.response.dto';
import { CityPeopleResponseDto } from 'src/dto/response/city.people.response.dto';
import { CityRoadAvgResponseDto } from 'src/dto/response/city.road.avg.response.dto';
import CityAccident from 'src/entities/city.accident.entity';
import City from 'src/entities/city.entity';
import CityPeople from 'src/entities/city.people.entity';
import CityRoad from 'src/entities/city.road.entity';
import { Repository } from 'typeorm';
import { ICityRepository } from './city.repository.interface';

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
    const result = await this.cityRepository
      .createQueryBuilder()
      .insert()
      .into(City)
      .values({ place, type })
      .execute();
    return result.identifiers[0].cityId;
  }

  async insertCityPeople(
    cityId: number,
    lat: number,
    lng: number,
    parsed: any,
  ): Promise<void> {
    await this.cityPeopleRepository
      .createQueryBuilder()
      .insert()
      .into(CityPeople)
      .values({
        peopleCityId: cityId,
        densityLevel:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_CONGEST_LVL._text,
        message:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_CONGEST_MSG._text,
        densityMin:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_PPLTN_MIN._text,
        densityMax:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_PPLTN_MAX._text,
        residentRatio:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .RESNT_PPLTN_RATE._text,
        nonResidentRatio:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .NON_RESNT_PPLTN_RATE._text,
        lat,
        lng,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .PPLTN_TIME._text,
      })
      .execute();
  }

  async insertCityRoad(cityId: number, parsed: any): Promise<void> {
    await this.cityRoadRepository
      .createQueryBuilder()
      .insert()
      .into(CityRoad)
      .values({
        roadCityId: cityId,
        densityLevel:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRAFFIC_IDX._text,
        message:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_MSG._text,
        speed:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRAFFIC_SPD._text,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRFFIC_TIME._text,
      })
      .execute();
  }

  async insertCityAccident(cityId: number, parsed: any): Promise<void> {
    if (
      Object.keys(parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS)
        .length === 0
    ) {
      return;
    }
    await this.cityAccidentRepository
      .createQueryBuilder()
      .insert()
      .into(CityAccident)
      .values({
        accidentCityId: cityId,
        beginTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_OCCR_DT._text,
        endTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .EXP_CLR_DT._text,
        type: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_TYPE._text,
        detailType:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_DTYPE._text,
        lat: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_X._text,
        lng: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_Y._text,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_TIME._text,
      })
      .execute();
  }

  async updateCityPeople(cityId: number, parsed): Promise<void> {
    await this.cityPeopleRepository
      .createQueryBuilder()
      .update(CityPeople)
      .set({
        densityLevel:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_CONGEST_LVL._text,
        message:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_CONGEST_MSG._text,
        densityMin:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_PPLTN_MIN._text,
        densityMax:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .AREA_PPLTN_MAX._text,
        residentRatio:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .RESNT_PPLTN_RATE._text,
        nonResidentRatio:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .NON_RESNT_PPLTN_RATE._text,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS.LIVE_PPLTN_STTS
            .PPLTN_TIME._text,
      })
      .where({
        peopleCityId: cityId,
      })
      .execute();
  }

  async updateCityRoad(cityId: number, parsed): Promise<void> {
    await this.cityRoadRepository
      .createQueryBuilder()
      .update(CityRoad)
      .set({
        densityLevel:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRAFFIC_IDX._text,
        message:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_MSG._text,
        speed:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRAFFIC_SPD._text,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA
            .ROAD_TRFFIC_TIME._text,
      })
      .where({
        roadCityId: cityId,
      })
      .execute();
  }

  async updateCityAccident(cityId: number, parsed): Promise<void> {
    if (
      Object.keys(parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS)
        .length === 0
    ) {
      return;
    }
    await this.cityAccidentRepository
      .createQueryBuilder()
      .update(CityAccident)
      .set({
        beginTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_OCCR_DT._text,
        endTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .EXP_CLR_DT._text,
        type: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_TYPE._text,
        detailType:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_DTYPE._text,
        lat: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_X._text,
        lng: parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS
          .ACDNT_CNTRL_STTS.ACDNT_Y._text,
        updateTime:
          parsed['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS.ACDNT_CNTRL_STTS
            .ACDNT_TIME._text,
      })
      .where({
        accidentCityId: cityId,
      })
      .execute();
  }

  async getCityPeople(): Promise<CityPeopleResponseDto[]> {
    const results = await this.cityPeopleRepository.find({
      relations: {
        city: true,
      },
    });
    if (results.length === 0) {
      return null;
    }
    const cityPeopleResponseDto = results.map((result) => ({
      cityId: result.city.cityId,
      place: result.city.place,
      type: result.city.type,
      level: result.densityLevel,
      message: result.message,
      densityMin: result.densityMin,
      densityMax: result.densityMax,
      residentRatio: result.residentRatio,
      nonResidentRatio: result.nonResidentRatio,
      lat: result.lat,
      lng: result.lng,
      updateTime: result.updateTime,
    }));
    return cityPeopleResponseDto;
  }

  async getCityRoadAvg(cityId: number): Promise<CityRoadAvgResponseDto> {
    const result = await this.cityRoadRepository.findOne({
      relations: {
        city: true,
      },
      where: {
        roadCityId: cityId,
      },
    });
    if (!result) {
      return null;
    }
    const cityRoadAvgResponseDto = {
      cityId: result.city.cityId,
      place: result.city.place,
      type: result.city.type,
      level: result.densityLevel,
      message: result.message,
      speed: result.speed,
      updateTime: result.updateTime,
    };
    return cityRoadAvgResponseDto;
  }

  async getCityAccident(): Promise<CityAccidentResponseDto[]> {
    const results = await this.cityAccidentRepository.find();
    if (results.length === 0) {
      return null;
    }
    const cityAccidentResponseDto = results.map((result) => ({
      accidentId: result.accidentId,
      beginTime: result.beginTime,
      endTime: result.endTime,
      type: result.type,
      detailType: result.detailType,
      lat: result.lat,
      lng: result.lng,
      updateTime: result.updateTime,
    }));
    return cityAccidentResponseDto;
  }
}
