import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EventBookmarkService } from './event.bookmark.service';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { JwtAuthGuard } from 'src/auth/jwt/guard/jwt.auth.guard';
import { EventSummaryGroupResponseDto } from 'src/dto/response/event.summary.group.response.dto';
import ProgressType from 'src/enums/progress.type.enum';
import CityType from 'src/enums/city.type.enum';

@ApiTags('/api/event/bookmark')
@Controller({
  path: '/api/event/bookmark',
})
export class EventBookmarkController {
  private logger = new Logger(EventBookmarkController.name);
  constructor(private eventBookmarkService: EventBookmarkService) {}

  @ApiOperation({
    summary: '북마크한 이벤트 요약 정보 조회',
    description:
      '유저가 북마크한 이벤트 중 city와 progress로 필터링 된 요약 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description:
      '북마크한 이벤트 요약 정보 조회 성공 시, 200 OK를 응답받습니다.',
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
  @UseGuards(JwtAuthGuard)
  async getEventSummaryOfBookmark(
    @User() user: UserSessionDto,
    @Query('city') city?: CityType,
    @Query('progress') progress?: ProgressType,
  ): Promise<EventSummaryGroupResponseDto[]> {
    this.logger.debug(`Called ${this.getEventSummaryOfBookmark.name}`);
    try {
      return await this.eventBookmarkService.getEventSummaryOfBookmark(
        user.userId,
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
    summary: '이벤트를 북마크에 추가',
    description: 'eventId에 해당하는 이벤트를 북마크에 추가합니다.',
  })
  @ApiNoContentResponse({
    description:
      '이벤트를 북마크에 추가 성공 시, 204 No Content를 응답받습니다.',
  })
  @ApiConflictResponse({
    description:
      '해당하는 이벤트가 없거나 이미 북마크에 추가된 이벤트인 경우, 409 Conflict를 응답받습니다.',
  })
  @Post('/post/:eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async postBookmark(
    @Param('eventId', ParseIntPipe) eventId: number,
    @User() user: UserSessionDto,
  ): Promise<void> {
    this.logger.debug(`Called ${this.postBookmark.name}`);
    try {
      return await this.eventBookmarkService.postBookmark(eventId, user.userId);
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
