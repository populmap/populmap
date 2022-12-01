import { Controller, Get, HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { CityService } from "./city.service";

@Controller('city')
export class CityController {
  private logger = new Logger(CityController.name);
  constructor(
    private cityService: CityService,
  ) {}

  @Get('people')
  async getCityPeople() {
    this.logger.debug(`Called ${this.getCityPeople.name}`);
    try {
      // return await this.cityService.getCityPeople();
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(
          `🚨 populmap 내부 서버 에러가 발생했습니다 🥲 🚨`,
        );
      }
    }
  }

  @Get('road')
  async getCityRoad() {
    this.logger.debug(`Called ${this.getCityRoad.name}`);
    try {
      // return await this.cityService.getCityRoad();
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(
          `🚨 populmap 내부 서버 에러가 발생했습니다 🥲 🚨`,
        );
      }
    }
  }

  @Get('accident')
  async getCityAccident() {
    this.logger.debug(`Called ${this.getCityAccident.name}`);
    try {
      // return await this.cityService.getCityAccident();
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException(
          `🚨 populmap 내부 서버 에러가 발생했습니다 🥲 🚨`,
        );
      }
    }
  }
}
