import { CityAccidentResponseDto } from "src/dto/response/city.accident.response.dto";
import { CityPeopleResponseDto } from "src/dto/response/city.people.response.dto";
import { CityRoadAvgResponseDto } from "src/dto/response/city.road.avg.response.dto";

export interface ICityRepository {
  /**
   * place와 type으로 cityId를 가져온다.
   * @param place
   * @param type
   */
  getCityIdIfExists(place: string, type: string): Promise<number>;

  /**
   * place와 type에 해당하는 city를 생성하고, cityId를 반환한다.
   * @param place
   * @param type
   */
  insertCity(place: string, type: string): Promise<number>;

  /**
   * cityId에 해당하는 cityPeople를 생성한다.
   * @param cityId
   * @param lat
   * @param lng
   * @param parsed
   */
  insertCityPeople(cityId: number, lat: number, lng: number, parsed: any): Promise<void>;

  /**
   * cityId에 해당하는 cityRoad를 생성한다.
   * @param cityId
   * @param parsed
   */
  insertCityRoad(cityId: number, parsed: any): Promise<void>;

  /**
   * cityId에 해당하는 cityAccident를 생성한다.
   * @param cityId
   * @param parsed
   */
  insertCityAccident(cityId: number, parsed: any): Promise<void>;

  /**
   * cityId에 해당하는 cityPeople를 업데이트한다.
   * @param cityId
   * @param parsed
   */
  updateCityPeople(cityId: number, parsed): Promise<void>;

  /**
   * cityId에 해당하는 cityRoad를 업데이트한다.
   * @param cityId
   * @param parsed
   */
  updateCityRoad(cityId: number, parsed): Promise<void>;

  /**
   * cityId에 해당하는 cityAccident를 업데이트한다.
   * @param cityId
   * @param parsed
   */
  updateCityAccident(cityId: number, parsed): Promise<void>;

  /**
   * cityPeople을 가져온다.
   */
  getCityPeople(): Promise<CityPeopleResponseDto[]>;

  /**
   * cityId에 해당하는 cityRoadAvg를 가져온다.
   */
  getCityRoadAvg(cityId: number): Promise<CityRoadAvgResponseDto>;

  /**
   * 모든 cityAccident 정보를 가져온다.
   */
  getCityAccident(): Promise<CityAccidentResponseDto[]>;
}
