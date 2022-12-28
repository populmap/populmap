import {
  Controller,
  Delete,
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
  ApiCreatedResponse,
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
import { EventPagiNationResponseDto } from 'src/dto/response/event.pagination.response.dto';

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
    summary: '북마크한 이벤트 list 정보 조회',
    description:
      '유저가 북마크한 이벤트 중 city와 progress로 필터링 된 list 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description:
      '북마크한 이벤트 list 정보 조회 성공 시, 200 OK를 응답받습니다.',
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
  @UseGuards(JwtAuthGuard)
  async getEventListOfBookmark(
    @User() user: UserSessionDto,
    @Query('page', ParseIntPipe) page: number,
    @Query('length', ParseIntPipe) length: number,
    @Query('city') city?: CityType,
    @Query('progress') progress?: ProgressType,
  ): Promise<EventPagiNationResponseDto> {
    this.logger.debug(`Called ${this.getEventListOfBookmark.name}`);
    console.log(page, length, city, progress);
    try {
      return await this.eventBookmarkService.getEventListOfBookmark(
        user.userId,
        page,
        length,
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
  @ApiCreatedResponse({
    description: '이벤트를 북마크에 추가 성공 시, 201 Created를 응답받습니다.',
  })
  @ApiConflictResponse({
    description:
      '해당하는 이벤트가 없거나 이미 북마크에 추가된 이벤트인 경우, 409 Conflict를 응답받습니다.',
  })
  @Post('/post/:eventId')
  @HttpCode(HttpStatus.CREATED)
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

  @ApiOperation({
    summary: '이벤트를 북마크에서 삭제',
    description: 'eventId에 해당하는 이벤트를 북마크에서 삭제합니다.',
  })
  @ApiNoContentResponse({
    description:
      '북마크에서 이벤트 삭제 성공 시, 24 No Content를 응답받습니다.',
  })
  @ApiConflictResponse({
    description:
      '해당하는 이벤트가 없거나 북마크에 없는 이벤트를 삭제 시도한 경우, 409 Conflict를 응답받습니다.',
  })
  @Delete('/delete/:eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteBookmark(
    @Param('eventId', ParseIntPipe) eventId: number,
    @User() user: UserSessionDto,
  ): Promise<void> {
    this.logger.debug(`Called ${this.deleteBookmark.name}`);
    try {
      return await this.eventBookmarkService.deleteBookmark(
        eventId,
        user.userId,
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
