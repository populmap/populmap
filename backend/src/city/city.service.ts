import { Inject, Injectable, Logger } from "@nestjs/common";
import { ICityRepository } from "./repository/city.repository.interface";

@Injectable()
export class CityService {
  private logger = new Logger(CityService.name);
  constructor(
    @Inject('ICityRepository') private cityRepository: ICityRepository,
    // @Inject(ConfigService) private configService: ConfigService,
    // private readonly httpService: HttpService,
  ) {}

}
