const enum progressStatus {
  BEFOREPROGRESS = "진행전",
  INPROGRESS = "진행중",
  AFTERPROGRESS = "진행종료",
}
export default progressStatus;

export interface EventDetailResponseDto {
  eventId: number;
  title: string;
  lat: number;
  lng: number;
  call: string;
  description: string;
  fee: string;
  beginTime: Date;
  endTime: Date;
  modifiedDate: Date;
  progress: progressStatus;
  place: string;
  url: string;
}
