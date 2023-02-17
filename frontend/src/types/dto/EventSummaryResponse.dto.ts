import progressType from "./EventDetailResponse.dto";
import colorTypes from "../colorTypes";

export interface EventSummaryResponseDto {
  eventId: number;
  title: string;
  address: string;
  progress: string;
  isBookmarked: boolean;
}

export const progressColor = (status: string): string => {
  switch (status) {
    case progressType.BEFOREPROGRESS:
      return colorTypes.orange;
    case progressType.INPROGRESS:
      return colorTypes.green;
    case progressType.AFTERPROGRESS:
      return colorTypes.red;
    default:
      return colorTypes.white;
  }
};

export interface EventSummaryGroupResponseDto {
  eventSummaries: EventSummaryResponseDto[];
  lat: number;
  lng: number;
}
