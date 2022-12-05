import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class EventInformationDataComponent {
  private logger = new Logger(EventInformationDataComponent.name);
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getEventInformationDataTrigger(): Promise<void> {
    this.logger.debug(`Called ${this.getEventInformationDataTrigger.name}`);

  }
}
