import {
  Controller,
  Logger,
  Query,
  Get,
  HttpCode,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EventSearchService } from './event.search.service';
import CityType from 'src/enums/city.type.enum';
import ProgressType from 'src/enums/progress.type.enum';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import { EventDetailResponseDto } from 'src/dto/response/event.detail.response.dto';
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';
import { JwtOptionalAuthGuard } from 'src/auth/jwt/guard/jwt.optional.auth.guard';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';

@ApiTags('/api/event/search')
@Controller({
  path: '/api/event/search',
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
  @UseGuards(JwtOptionalAuthGuard)
  async getEventSummary(
    @User() user?: UserSessionDto,
    @Query('city') city?: CityType,
    @Query('progress') progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummary.name}`);
    const userId = user ? user.userId : -1;
    try {
      return await this.eventSearchService.getEventSummary(
        userId,
        city,
        progress,
      );
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
    summary: '이벤트 상세 정보 조회',
    description: 'eventId로 특정 이벤트 상세 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '이벤트 요약 정보 조회 성공 시, 200 OK를 응답받습니다.',
  })
  @ApiNotFoundResponse({
    description: '이벤트 요약 정보 조회 실패 시, 404 Not Found를 응답받습니다.',
  })
  @Get('detail/:eventId')
  @HttpCode(HttpStatus.OK)
  async getEventDetail(
    @Param('eventId') eventId: number,
  ): Promise<EventDetailResponseDto> {
    this.logger.debug(`Called ${this.getEventDetail.name}`);
    try {
      return await this.eventSearchService.getEventDetail(eventId);
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
    summary: '이벤트 요약 list 정보 조회',
    description: 'city와 progress로 필터링 된 이벤트 list 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: '이벤트 list 정보 조회 성공 시, 200 OK를 응답받습니다.',
  })
  @ApiQuery({
    name: 'page',
    description: '조회할 페이지(0부터 시작)',
    type: 'number',
  })
  @ApiQuery({
    name: 'length',
    description: '가져올 데이터 수',
    type: 'number',
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
  @Get('list/filter')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtOptionalAuthGuard)
  async getEventList(
    @Query('page', ParseIntPipe) page: number,
    @Query('length', ParseIntPipe) length: number,
    @User() user?: UserSessionDto,
    @Query('city') city?: CityType,
    @Query('progress') progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto> {
    this.logger.debug(`Called ${this.getEventList.name}`);
    const userId = user ? user.userId : -1;
    try {
      return await this.eventSearchService.getEventList(
        page,
        length,
        userId,
        city,
        progress,
      );
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
