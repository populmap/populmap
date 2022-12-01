import { ApiProperty } from "@nestjs/swagger";

export class CityPeopleResponseDto {
  @ApiProperty()
  cityId: number;

  @ApiProperty()
  place?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  densityLevel: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  densityMin: number;

  @ApiProperty()
  densityMax: number;

  @ApiProperty()
  residentRatio: number;

  @ApiProperty()
  nonResidentRatio: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
