import progressType from "./EventDetailResponse.dto";

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
      return "#ff6f0f";
    case progressType.INPROGRESS:
      return "#18ce5f";
    case progressType.AFTERPROGRESS:
      return "#ff0200";
    default:
      return "#ffffff";
  }
};

export interface EventSummaryGroupResponseDto {
  eventSummaries: EventSummaryResponseDto[];
  lat: number;
  lng: number;
}
