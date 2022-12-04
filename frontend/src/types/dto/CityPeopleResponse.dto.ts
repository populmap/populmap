const enum densityType {
  SMOOTH = "여유",
  NORMAL = "보통",
  CROWDED = "붐빔",
  VERYCROWDED = "매우 붐빔",
}

export default densityType;

export interface CityPeopleResponseDto {
  cityId: number;
  place: string;
  type: string;
  level: string;
  message: string;
  densityMin: number;
  densityMax: number;
  residentRatio: number;
  nonRegidentRatio: number;
  lat: number;
  lng: number;
  updateTime: Date;
}
