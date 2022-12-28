import roadLevel from "./CityRoadAvgResponse.dto";

const enum densityLevel {
  SMOOTH = "여유",
  NORMAL = "보통",
  CROWDED = "약간 붐빔",
  VERYCROWDED = "붐빔",
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

export const levelColor = (level: string | undefined): string => {
  console.log(level);
  switch (level) {
    case densityLevel.SMOOTH:
      return "#18ce5f";
    case roadLevel.SMOOTH:
      return "#18ce5f";
    case densityLevel.NORMAL:
      return "#f7e700";
    case roadLevel.NORMAL:
      return "#ff6f0f";
    case densityLevel.CROWDED:
      return "#ff6f0f";
    case densityLevel.VERYCROWDED:
      return "#ff0200";
    case roadLevel.VERYCROWDED:
      return "#ff0200";
    default:
      return "#ffffff";
  }
};
