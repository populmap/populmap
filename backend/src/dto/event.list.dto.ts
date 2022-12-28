import { ApiProperty } from '@nestjs/swagger';

export class EventListDto {
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
    description: '행사 시작 시간',
    example: '2020-11-01T10:00:00.000Z',
  })
  beginTime: Date;

  @ApiProperty({
    description: '행사 종료 시간',
    example: '2020-11-01T12:00:00.000Z',
  })
  endTime: Date;

  @ApiProperty({
    description: '행사 기관 전화번호',
    example: '031-123-4567',
  })
  call: string;

  @ApiProperty({
    description: '행사 진행 여부',
    example: '진행중',
  })
  progress: string;

  @ApiProperty({
    description: '행사가 북마크에 추가되어있는지 여부',
    example: true,
  })
  isBookmarked: boolean;
}
