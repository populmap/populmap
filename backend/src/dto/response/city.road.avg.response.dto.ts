import { ApiProperty } from '@nestjs/swagger';

export class CityRoadAvgResponseDto {
  @ApiProperty({
    description: '지역 정보 ID',
    example: 1,
  })
  cityId: number;

  @ApiProperty({
    description: '지역 이름',
    example: '뚝섬한강공원',
  })
  place: string;

  @ApiProperty({
    description: '지역 종류',
    example: '공원',
  })
  type: string;

  @ApiProperty({
    description: '해당 지역 도로 평균 밀집도 수준',
    example: '서행',
  })
  level: string;

  @ApiProperty({
    description: '해당 지역 도로 평균 밀집도 수준에 대한 설명',
    example: '해당 장소로 이동·진입시 시간이 다소 소요될 수 있어요.',
  })
  message: string;

  @ApiProperty({
    description: '해당 지역 도로 차량 평균 이동 속도',
    example: '20',
  })
  speed: string;

  @ApiProperty({
    description: '업데이트된 시간',
    example: '2022-12-02 00:00:00',
  })
  updateTime: Date;
}
