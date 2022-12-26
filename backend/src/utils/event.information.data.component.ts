import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { firstValueFrom, map } from 'rxjs';
import { EventService } from 'src/event/event.service';
import * as xmlParser from 'xml-js';
import * as dayjs from 'dayjs';

@Injectable()
export class EventInformationDataComponent {
  private logger = new Logger(EventInformationDataComponent.name);
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
    private eventService: EventService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Timeout(4000)
  async getEventInformationDataTrigger(): Promise<void> {
    this.logger.debug(`Called ${this.getEventInformationDataTrigger.name}`);
    for (let i = -30; i <= 30; i++) {
      const today = new Date();
      const target = new Date();
      target.setTime(today.getTime() + i * 24 * 60 * 60 * 1000);
      const url = `http://api.data.go.kr/openapi/tn_pubr_public_pblprfr_event_info_api?serviceKey=${this.configService.get<string>(
        'seoul.eventSecret',
      )}&eventStartDate=${dayjs(target).format('YYYY-MM-DD')}`;
      this.logger.debug(`Request url: ${url}`);
      try {
        const data = await firstValueFrom(
          this.httpService.get(url).pipe(map((res) => res.data)),
        );
        const parsed = JSON.parse(
          xmlParser.xml2json(data, { compact: true, spaces: 2 }),
        );
        await this.getEventInformationData(parsed);
      } catch (err) {
        throw err;
      }
    }
  }

  async getEventInformationData(parsed: any): Promise<void> {
    this.logger.debug(`Called ${this.getEventInformationData.name}`);
    const items = parsed.response.body ? parsed.response.body.items : null;
    if (items) {
      if (Array.isArray(items.item)) {
        for (const item of items.item) {
          if (item) {
            await this.eventService.putEventInformationData(item);
          }
        }
      }
    }
  }
}
