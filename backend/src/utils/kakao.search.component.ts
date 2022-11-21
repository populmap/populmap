import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, map } from "rxjs";
import { SearchByPlaceDto } from "src/dto/search.by.place.dto";

@Injectable()
export class KakaoSearch {
  private logger = new Logger(KakaoSearch.name);
  private appkey;
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.appkey = configService.get<string>('kakao.clientID');
    console.log(this.appkey);
  }

  async requestSearchByPlace(place: string) {
    this.logger.debug(
      `Called ${KakaoSearch.name} ${this.requestSearchByPlace.name}`,
    );
    let searchByPlace: SearchByPlaceDto;
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    const headersRequest = {
      Authorization: `KakaoAK ${this.appkey}`,
    };
    const params = { query: `${place}`};
    const config = { params, headers: headersRequest };
    this.logger.debug(`Request url: ${url}`);
    await firstValueFrom(
      this.httpService
        .get(url, config)
        .pipe(map((res) => res.data)),
      )
      .then(async (data) => {
        const result = data.documents[0];
        const searchByPlace: SearchByPlaceDto = {
          address: result.road_address_name,
          lat: Number(result.x),
          lng: Number(result.y),
        };
        await this.eventService.something(searchByPlace);
      })
      .catch((err) => {
        throw err;
      });
  }
}
