export interface EventListDto {
  eventId: number;
  title: string;
  address: string;
  beginTime: Date;
  endTime: Date;
  call: string;
  progress: string;
}

export interface EventPagiNationResponseDto {
  eventLists: EventListDto[];
  totalLength: number;
}
