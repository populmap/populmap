export interface EventSummaryResponseDto {
  eventId: number;
  title: string;
  address: string;
  progress: string;
  isBookmarked: boolean;
}

export interface EventSummaryGroupResponseDto {
  eventSummaries: EventSummaryResponseDto[];
  lat: number;
  lng: number;
}
