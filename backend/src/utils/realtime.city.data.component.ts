import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, map } from "rxjs";
import { AreaList } from "src/constants/area.list.constant";
import * as xmlParser from 'xml-js';
import { CityService } from "src/city/city.service";
import { KakaoSearch } from "./kakao.search.component";
import { CityPeoplePlaceDataDto } from "src/dto/city.people.place.data.dto";

Injectable()
export class RealtimeCityDataComponent {
  private logger = new Logger(RealtimeCityDataComponent.name);
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
    private cityService: CityService,
  ) {}

  // @Cron(CronExpression.EVERY_HOUR)
  // @Timeout(5000)
  async getRealtimeCityDataTrigger(): Promise<void> {
    this.logger.debug(
      `Called ${this.getRealtimeCityDataTrigger.name}`,
    );
    // iterate AreaList
    for (const [type, areas] of Object.entries(AreaList)) {
      await this.getRealtimeCityData(type, areas);
    }
  }

  async getRealtimeCityData(type: string, areas: string[]): Promise<void> {
    this.logger.debug(
      `Called ${this.getRealtimeCityData.name}`,
    );
    for (const area of areas) {
      console.log(type, area);
      const url = `http://openapi.seoul.go.kr:8088/${this.configService.get<string>('seoul.densitySecret')}/xml/citydata/1/1/${area}`;
      this.logger.debug(`Request url: ${url}`);
      await firstValueFrom(
        this.httpService.get(url).pipe(map((res) => res.data)),
      )
      .then(async (data) => {
        const parsed = JSON.parse(xmlParser.xml2json(data, { compact: true, spaces: 2 }));
        await this.cityService.putRealtimeCityData(area, type, parsed);
      })
      .catch((err) => {
        throw err;
      });
    }
  }
}
