import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { EventService } from "src/event/event.service";

@Injectable()
export class EventTimer {
  private logger = new Logger(EventTimer.name);
  private appkey;
  constructor(
    // @Inject(ConfigService) private configService: ConfigService,
    // private readonly httpService: HttpService,
    @Inject(forwardRef(() => EventService))
    private eventService: EventService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  setTimeoutDate(event_title: string, date: Date, callback) {
    const now = new Date().getTime();
    const then = date.getTime();
    const diff = Math.max(then - now, 0);
    let timeout: NodeJS.Timeout;
    try {
      this.schedulerRegistry.deleteTimeout(event_title);
    } catch (err) {}
    if (diff > 0x7fffffff) {
      // setTimeout limit is MAX_INT32=(2^31-1)
      timeout = setTimeout(() => {
        this.setTimeoutDate(event_title, date, callback);
      }, 0x7fffffff);
    } else {
      timeout = setTimeout(callback, diff);
    }
    this.schedulerRegistry.addTimeout(event_title, timeout);
  }

  // endDate + 3일 후 fired될 Timer등록.
  // Timer가 fired 되면 콜백으로 deleteEvent를 호출한다.
  async setDeleteEventTimer(title: string, endDate: Date) {
    const fireDate = new Date(endDate);
    fireDate.setDate(fireDate.getDate() + 3);
    this.logger.log(`new timer that fired on ${fireDate} set!`);

    const callback = async () => {
      this.logger.debug(`Delete event timer for ${title} fired!`);
      await this.eventService.deleteEvent(title);
    };

    this.setTimeoutDate(title, fireDate, callback);
  }
}
