import { ApiProperty } from '@nestjs/swagger';

export class CityPeopleResponseDto {
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
    description: '지역의 밀집도 수준',
    example: '여유',
  })
  level: string;

  @ApiProperty({
    description: '지역의 밀집도 수준에 대한 설명',
    example:
      '사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.',
  })
  message: string;

  @ApiProperty({
    description: '지역의 인구 최소 인원',
    example: 6500,
  })
  densityMin: number;

  @ApiProperty({
    description: '지역의 인구 최대 인원',
    example: 7500,
  })
  densityMax: number;

  @ApiProperty({
    description: '지역의 상주 인구 비율',
    example: 48,
  })
  residentRatio: number;

  @ApiProperty({
    description: '지역의 비상주 인구 비율',
    example: 52,
  })
  nonResidentRatio: number;

  @ApiProperty({
    description: '위도',
    example: 37.541,
  })
  lat: number;

  @ApiProperty({
    description: '경도',
    example: 127.05,
  })
  lng: number;

  @ApiProperty({
    description: '지역의 인구 정보가 업데이트된 시간',
    example: '2022-12-02T00:00:00.000Z',
  })
  updateTime: Date;
}
