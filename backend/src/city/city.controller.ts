import { Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Logger, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CityService } from "./city.service";

@Controller('city')
export class CityController {
  private logger = new Logger(CityController.name);
  constructor(
    private cityService: CityService,
  ) {}

  @ApiOperation({
    summary: '도시 인구 밀집도 정보 조회',
    description:
      'DB에 저장된 모든 도시 지역의 인구 밀집도 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '조회 성공 시, 200 OK를 응답받습니다.',
  })
  @Get('people')
  @HttpCode(HttpStatus.OK)
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

  @ApiOperation({
    summary: '도시 인구 밀집도 정보 조회',
    description:
      'cityId를 통해 DB에 저장된 해당 지역의 차량 밀집도 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '조회 성공 시, 200 OK를 응답받습니다.',
  })
  @ApiParam({
    name: 'cityId',
    description: '도시 지역 ID',
    type: 'number',
  })
  @Get('road/avg/:cityId')
  @HttpCode(HttpStatus.OK)
  async getCityRoad(@Param('cityId') cityId: number) {
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

  @ApiOperation({
    summary: '도시 지역의 사고/행사 정보 조회',
    description:
      'DB에 저장된 모든 도시 지역의 사고/행사 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '조회 성공 시, 200 OK를 응답받습니다.',
  })
  @Get('accident')
  @HttpCode(HttpStatus.OK)
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
