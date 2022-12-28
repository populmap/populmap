import { ApiProperty } from '@nestjs/swagger';
import { EventSummaryDto } from '../event.summary.dto';
import ProgressType from 'src/enums/progress.type.enum';

export class EventSummaryGroupResponseDto {
  @ApiProperty({
    description: '이벤트 요약 정보',
    example: [
      {
        eventId: 1,
        title: '11월 토요키즈클래식',
        address: '경기도 용인시 수지구 포은대로 499 수지레스피아',
        progress: ProgressType.BEFOREPROGRESS,
      },
    ],
  })
  eventSummaries: EventSummaryDto[];

  @ApiProperty({
    description: '위도',
    example: 37.321234,
  })
  lat: number;

  @ApiProperty({
    description: '경도',
    example: 127.123456,
  })
  lng: number;
}
