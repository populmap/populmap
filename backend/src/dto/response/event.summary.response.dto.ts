import { ApiProperty } from '@nestjs/swagger';
import ProgressType from 'src/enums/progress.type.enum';

export class EventSummaryResponseDto {
  @ApiProperty({
    description: '행사 고유 ID',
    example: 1,
  })
  eventId: number;

  @ApiProperty({
    description: '행사 이름',
    example: '11월 토요키즈클래식',
  })
  title: string;

  @ApiProperty({
    description: '행사 진행 주소',
    example: '경기도 용인시 수지구 포은대로 499 수지레스피아',
  })
  address: string;

  @ApiProperty({
    description: '위도',
    example: 37.323,
  })
  lat: number;

  @ApiProperty({
    description: '경도',
    example: 127.099,
  })
  lng: number;

  @ApiProperty({
    description: '행사 진행 여부',
    example: ProgressType.BEFOREPROGRESS,
  })
  progress: ProgressType;
}
