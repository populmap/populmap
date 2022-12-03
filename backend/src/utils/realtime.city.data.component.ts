import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { AreaList, IAreaMap } from 'src/constants/area.list.constant';
import * as xmlParser from 'xml-js';
import { CityService } from 'src/city/city.service';

Injectable();
export class RealtimeCityDataComponent {
  private logger = new Logger(RealtimeCityDataComponent.name);
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
    private cityService: CityService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async getRealtimeCityDataTrigger(): Promise<void> {
    this.logger.debug(`Called ${this.getRealtimeCityDataTrigger.name}`);
    for (const [type, areas] of Object.entries(AreaList)) {
      await this.getRealtimeCityData(type, areas);
    }
  }

  async getRealtimeCityData(type: string, areas: IAreaMap[]): Promise<void> {
    this.logger.debug(`Called ${this.getRealtimeCityData.name}`);
    for (const area of areas) {
      this.logger.debug(type, area);
      const url = `http://openapi.seoul.go.kr:8088/${this.configService.get<string>(
        'seoul.densitySecret',
      )}/xml/citydata/1/1/${area.place}`;
      this.logger.debug(`Request url: ${url}`);
      await firstValueFrom(
        this.httpService.get(url).pipe(map((res) => res.data)),
      )
        .then(async (data) => {
          const parsed = JSON.parse(
            xmlParser.xml2json(data, { compact: true, spaces: 2 }),
          );
          await this.cityService.putRealtimeCityData(area, type, parsed);
        })
        .catch((err) => {
          this.logger.error(err);
        });
    }
  }
}
