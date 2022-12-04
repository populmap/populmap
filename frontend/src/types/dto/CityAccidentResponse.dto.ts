export interface CityAccidentResponseDto {
  accidentId: number;
  beginTime: string;
  endTime: string;
  type: string;
  detailType: string;
  lat: number;
  lng: number;
  updateTime: Date;
}
