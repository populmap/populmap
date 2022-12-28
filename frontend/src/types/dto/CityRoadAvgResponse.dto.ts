const enum roadLevel {
  SMOOTH = "원활",
  NORMAL = "서행",
  VERYCROWDED = "정체",
}

export default roadLevel;

export interface CityRoadAvgResponseDto {
  cityId: number;
  place: string;
  level: string;
  message: string;
  speed: string;
  updateTime: Date;
}
