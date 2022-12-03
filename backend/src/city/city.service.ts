import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAreaMap } from 'src/constants/area.list.constant';
import { CityPeoplePlaceDataDto } from 'src/dto/city.people.place.data.dto';
import { CityAccidentResponseDto } from 'src/dto/response/city.accident.response.dto';
import { CityPeopleResponseDto } from 'src/dto/response/city.people.response.dto';
import { CityRoadAvgResponseDto } from 'src/dto/response/city.road.avg.response.dto';
import { KakaoSearch } from 'src/utils/kakao.search.component';
import { ICityRepository } from './repository/city.repository.interface';

@Injectable()
export class CityService {
  private logger = new Logger(CityService.name);
  constructor(
    @Inject('ICityRepository') private cityRepository: ICityRepository,
    private kakaoSearch: KakaoSearch,
  ) {}

  async putRealtimeCityData(
    area: IAreaMap,
    type: string,
    parsed: any,
  ): Promise<void> {
    this.logger.debug(`Called ${this.putRealtimeCityData.name}`);
    area.place;
    try {
      const cityId = await this.cityRepository.getCityIdIfExists(
        area.place,
        type,
      );
      if (!cityId) {
        const { lat, lng } = await this.kakaoSearch.requestSearchByKeyword(
          area.keyword,
        );
        const cityPeoplePlaceData: CityPeoplePlaceDataDto = {
          place: area.place,
          type,
          lat,
          lng,
        };
        await this.insertRealtimeCityData(cityPeoplePlaceData, parsed);
      } else {
        await this.updateRealtimeCityData(cityId, parsed);
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async insertRealtimeCityData(
    cityPeoplePlaceData: CityPeoplePlaceDataDto,
    parsed: any,
  ) {
    this.logger.debug(`Called ${this.insertRealtimeCityData.name}`);
    try {
      const { place, type, lat, lng } = cityPeoplePlaceData;
      const cityId = await this.cityRepository.insertCity(place, type);
      await this.cityRepository.insertCityPeople(cityId, lat, lng, parsed);
      await this.cityRepository.insertCityRoad(cityId, parsed);
      await this.cityRepository.insertCityAccident(cityId, parsed);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateRealtimeCityData(cityId: number, parsed: object) {
    this.logger.debug(`Called ${this.updateRealtimeCityData.name}`);
    try {
      await this.cityRepository.updateCityPeople(cityId, parsed);
      await this.cityRepository.updateCityRoad(cityId, parsed);
      await this.cityRepository.updateCityAccident(cityId, parsed);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getCityPeople(): Promise<CityPeopleResponseDto[]> {
    this.logger.debug(`Called ${this.getCityPeople.name}`);
    try {
      const cityPeopleResponseDto = await this.cityRepository.getCityPeople();
      if (!cityPeopleResponseDto) {
        throw new NotFoundException('City People Data Not Found');
      }
      return cityPeopleResponseDto;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getCityRoadAvg(cityId: number): Promise<CityRoadAvgResponseDto> {
    this.logger.debug(`Called ${this.getCityRoadAvg.name}`);
    try {
      const cityRoadAvgResponseDto = await this.cityRepository.getCityRoadAvg(
        cityId,
      );
      if (!cityRoadAvgResponseDto) {
        throw new NotFoundException('City Road Data Not Found');
      }
      return cityRoadAvgResponseDto;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getCityAccident(): Promise<CityAccidentResponseDto[]> {
    this.logger.debug(`Called ${this.getCityAccident.name}`);
    try {
      const cityAccidentResponseDto =
        await this.cityRepository.getCityAccident();
      if (!cityAccidentResponseDto) {
        throw new NotFoundException('City Accident Data Not Found');
      }
      return cityAccidentResponseDto;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
