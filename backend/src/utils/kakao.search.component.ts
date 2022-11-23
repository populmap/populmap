import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { SearchByPlaceDto } from 'src/dto/search.by.place.dto';
import { EventService } from 'src/event/event.service';

@Injectable()
export class KakaoSearch {
  private logger = new Logger(KakaoSearch.name);
  private appkey;
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => EventService))
    private eventService: EventService,
  ) {
    this.appkey = configService.get<string>('kakao.clientID');
  }

  async requestSearchByPlace(event) {
    this.logger.debug(
      `Called ${KakaoSearch.name} ${this.requestSearchByPlace.name}`,
    );
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    const headersRequest = {
      Authorization: `KakaoAK ${this.appkey}`,
    };
    const params = { query: `${event.PLACE}` };
    const config = { params, headers: headersRequest };
    this.logger.debug(`Request url: ${url}`);
    this.logger.debug(`Request queru: ${event.PLACE}`);
    await firstValueFrom(
      this.httpService.get(url, config).pipe(map((res) => res.data)),
    )
      .then(async (data) => {
        const result = data.documents[0];
        const searchByPlace: SearchByPlaceDto = {
          address: result.road_address_name,
          lat: Number(result.x),
          lng: Number(result.y),
        };
        await this.eventService.insertToEvent(event, searchByPlace);
      })
      .catch((err) => {
        throw err;
      });
  }
}
