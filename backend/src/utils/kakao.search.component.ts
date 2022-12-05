import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class KakaoSearch {
  private logger = new Logger(KakaoSearch.name);
  private appkey;
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.appkey = configService.get<string>('kakao.clientID');
  }

  // async requestSearchByPlace(place: string) {
  //   this.logger.debug(
  //     `Called ${KakaoSearch.name} ${this.requestSearchByPlace.name}`,
  //   );
  //   const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
  //   const headersRequest = {
  //     Authorization: `KakaoAK ${this.appkey}`,
  //   };
  //   const params = { query: `${place}` };
  //   const config = { params, headers: headersRequest };
  //   this.logger.debug(`Request url: ${url}`);
  //   await firstValueFrom(
  //     this.httpService.get(url, config).pipe(map((res) => res.data)),
  //   )
  //     .then(async (data) => {
  //       const result = data.documents[0];
  //       const searchByPlace: SearchByPlaceDto = {
  //         address: result.road_address_name,
  //         lat: Number(result.x),
  //         lng: Number(result.y),
  //       };
  //       // await this.eventService.something(searchByPlace);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }

  async requestSearchByKeyword(
    keyword: string,
  ): Promise<{ lat: number; lng: number }> {
    this.logger.debug(
      `Called ${KakaoSearch.name} ${this.requestSearchByKeyword.name}`,
    );
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    const headersRequest = {
      Authorization: `KakaoAK ${this.appkey}`,
    };
    const params = { query: `${keyword}` };
    const config = { params, headers: headersRequest };
    this.logger.debug(`Request url: ${url}`);
    try {
      const data = await firstValueFrom(
        this.httpService.get(url, config).pipe(map((res) => res.data)),
      );
      const result = data.documents[0];
      return { lat: Number(result.y), lng: Number(result.x) };
    } catch (err) {
      throw err;
    }
  }
}
