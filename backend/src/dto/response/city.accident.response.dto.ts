import { ApiProperty } from '@nestjs/swagger';

export class CityAccidentResponseDto {
  @ApiProperty({
    description: '사고/행사 ID',
    example: 1,
  })
  accidentId: number;

  @ApiProperty({
    description: '사고/행사 발생 시간',
    example: '2022-11-26 00:00:00',
  })
  beginTime: Date;

  @ApiProperty({
    description: '사고/행사 예상 종료 시간',
    example: '2022-11-26 12:00:00',
  })
  endTime: Date;

  @ApiProperty({
    description: '사고/행사 종류',
    example: '집회및행사',
  })
  type: string;

  @ApiProperty({
    description: '사고/행사 상세 종류',
    example: '행사',
  })
  detailType: string;

  @ApiProperty({
    description: '사고/행사 발생 위도',
    example: 37.555,
  })
  lat: number;

  @ApiProperty({
    description: '사고/행사 발생 경도',
    example: 126.999,
  })
  lng: number;

  @ApiProperty({
    description: '업데이트된 시간',
    example: '2022-12-02 00:00:00',
  })
  updateTime: Date;
}
