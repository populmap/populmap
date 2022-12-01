import { Inject, Injectable, Logger } from "@nestjs/common";
import { CityPeoplePlaceDataDto } from "src/dto/city.people.place.data.dto";
import { CityPeopleResponseDto } from "src/dto/response/city.people.response.dto";
import { KakaoSearch } from "src/utils/kakao.search.component";
import { ICityRepository } from "./repository/city.repository.interface";

@Injectable()
export class CityService {
  private logger = new Logger(CityService.name);
  constructor(
    @Inject('ICityRepository') private cityRepository: ICityRepository,
    private kakaoSearch: KakaoSearch,
  ) {}

  async putRealtimeCityData(place: string, type: string, parsed: any): Promise<void> {
    this.logger.debug(`Called ${this.putRealtimeCityData.name}`);
    try {
      const cityId = await this.cityRepository.getCityIdIfExists(place, type);
      if (!cityId) {
        const { lat, lng } = await this.kakaoSearch.requestSearchByPlace(place);
        const cityPeoplePlaceData: CityPeoplePlaceDataDto = { place, type, lat, lng };
        await this.insertRealtimeCityData(cityPeoplePlaceData, parsed);
      } else {
        await this.updateRealtimeCityData(cityId, parsed);
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async insertRealtimeCityData(cityPeoplePlaceData: CityPeoplePlaceDataDto, parsed: any) {
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
}
