import { ApiProperty } from '@nestjs/swagger';
import ProgressType from 'src/enums/progress.type.enum';

export class EventDetailResponseDto {
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
    description: '행사 기관 전화번호',
    example: '031-123-4567',
  })
  call: string;

  @ApiProperty({
    description: '행사 상세 설명',
    example: '문화향수권신장을 위한 한문연 사업의 일환으로 클래식 공연 개최',
  })
  description: string;

  @ApiProperty({
    description: '요금',
    example: '무료',
  })
  fee: string;

  @ApiProperty({
    description: '행사 시작 시간',
    example: '2020-11-07T10:00:00.000Z',
  })
  beginTime: Date;

  @ApiProperty({
    description: '행사 종료 시간',
    example: '2020-11-07T11:00:00.000Z',
  })
  endTime: Date;

  @ApiProperty({
    description: '정보 업데이트 시간',
    example: '2020-11-07T10:00:00.000Z',
  })
  modifiedTime: Date;

  @ApiProperty({
    description: '행사 진행 여부',
    example: ProgressType.BEFOREPROGRESS,
  })
  progress: ProgressType;

  @ApiProperty({
    description: '행사 장소',
    example: '수지레스피아',
  })
  place: string;

  @ApiProperty({
    description: '행사 홈페이지 주소',
    example: 'www.example.com',
  })
  url: string;
}
