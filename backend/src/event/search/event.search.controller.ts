import {
  Controller,
  Logger,
  Query,
  Get,
  HttpCode,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EventSearchService } from './event.search.service';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';
import { EventSummaryResponseDto } from 'src/dto/response/event.summary.response.dto';

@ApiTags('/api/event/search')
@Controller({
  path: 'event/search',
})
export class EventSearchController {
  private logger = new Logger(EventSearchController.name);
  constructor(private eventSearchService: EventSearchService) {}

  @ApiOperation({
    summary: '이벤트 요약 정보 조회',
    description: 'city와 progress로 필터링 된 이벤트 요약 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '이벤트 요약 정보 조회 성공 시, 200 OK를 응답받습니다.',
  })
  @ApiQuery({
    name: 'city',
    description: '이벤트가 열리는 도시',
    required: false,
    enum: CityType,
  })
  @ApiQuery({
    name: 'progress',
    description: '이벤트 진행 상태',
    required: false,
    enum: ProgressType,
  })
  @Get('summary/filter')
  @HttpCode(HttpStatus.OK)
  async getEventSummary(
    @Query('city') city?: CityType,
    @Query('progress') progress?: ProgressType,
  ): Promise<EventSummaryResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummary.name}`);
    try {
      return await this.eventSearchService.getEventSummary(city, progress);
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
