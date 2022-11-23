import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class SeoulEventInfo {
  private logger = new Logger(SeoulEventInfo.name);
  private totalCount;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async requestSeoulEventInfoTrigger() {
    this.logger.debug(
      `Called ${SeoulEventInfo.name} ${this.requestSeoulEventInfoTrigger.name}`,
    );
    await this.getEventTotalCount();
    const queryCount = Math.ceil(this.totalCount);
    for (let i = 0; i < queryCount; ++i) {
      await this.requestSeoulEventInfo(1 + 1000 * i, 1000 * (i + 1));
    }
  }

  async getEventTotalCount() {
    this.logger.debug(
      `Called ${SeoulEventInfo.name} ${this.getEventTotalCount.name}`,
    );
    const url = `http://openapi.seoul.go.kr:8088/${this.configService.get<string>('seoul.eventSecret')}/json/culturalEventInfo/1/1/`;
    this.logger.debug(`Request url: ${url}`);
    await firstValueFrom(
      this.httpService.get(url).pipe(map((res) => res.data)),
    )
    .then(async (data) => {
      this.totalCount = data.culturalEventInfo.list_total_count;
        // console.log('call add new event');
    })
    .catch((err) => {
      throw err;
    });
  }

  async requestSeoulEventInfo(start: number, end: number) {
    this.logger.debug(
      `Called ${SeoulEventInfo.name} ${this.requestSeoulEventInfo.name}`,
    );
    const url = `http://openapi.seoul.go.kr:8088/${this.configService.get<string>('seoul.eventSecret')}/json/culturalEventInfo/${start}/${end}/`;
    this.logger.debug(`Request url: ${url}`);
    await firstValueFrom(
      this.httpService.get(url).pipe(map((res) => res.data)),
    )
    .then(async (data) => {
      for await (const event of data.culturalEventInfo.row) {
        // this.eventService.addNewEvent(event);
      }
    })
    .catch((err) => {
      throw err;
    });
  }
}