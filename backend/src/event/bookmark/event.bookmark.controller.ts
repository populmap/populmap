import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EventBookmarkService } from './event.bookmark.service';
import { User } from 'src/decorator/user.decorator';
import { UserSessionDto } from 'src/dto/user.session.dto';
import { JwtAuthGuard } from 'src/auth/jwt/guard/jwt.auth.guard';

@ApiTags('/api/event/bookmark')
@Controller({
  path: '/api/event/bookmark',
})
export class EventBookmarkController {
  private logger = new Logger(EventBookmarkController.name);
  constructor(private eventBookmarkService: EventBookmarkService) {}

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
