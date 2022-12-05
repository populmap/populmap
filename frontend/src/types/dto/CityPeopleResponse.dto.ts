const enum densityLevel {
  SMOOTH = "여유",
  NORMAL = "보통",
  CROWDED = "붐빔",
  VERYCROWDED = "매우 붐빔",
}

export default densityLevel;

export interface CityPeopleResponseDto {
  cityId: number;
  place: string;
  type: string;
  level: densityLevel;
  message: string;
  densityMin: number;
  densityMax: number;
  residentRatio: number;
  nonResidentRatio: number;
  lat: number;
  lng: number;
  updateTime: Date;
}
