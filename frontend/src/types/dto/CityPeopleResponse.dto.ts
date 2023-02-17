import roadLevel from "./CityRoadAvgResponse.dto";
import colorTypes from "../colorTypes";
import orangeCircle from "../../../img/orangeCircle.png";
import greenCircle from "../../../img/greenCircle.png";
import yellowCircle from "../../../img/yellowCircle.png";
import redCircle from "../../../img/redCircle.png";

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

export const setImage = (status: string): string => {
  switch (status) {
    case densityLevel.SMOOTH:
      return greenCircle;
    case densityLevel.NORMAL:
      return yellowCircle;
    case densityLevel.CROWDED:
      return orangeCircle;
    case densityLevel.VERYCROWDED:
      return redCircle;
    default:
      return "";
  }
};

export const levelColor = (level: string | undefined): string => {
  switch (level) {
    case densityLevel.SMOOTH:
      return colorTypes.green;
    case roadLevel.SMOOTH:
      return colorTypes.green;
    case densityLevel.NORMAL:
      return colorTypes.yellow;
    case roadLevel.NORMAL:
      return colorTypes.orange;
    case densityLevel.CROWDED:
      return colorTypes.orange;
    case densityLevel.VERYCROWDED:
      return colorTypes.red;
    case roadLevel.VERYCROWDED:
      return colorTypes.red;
    default:
      return colorTypes.white;
  }
};
