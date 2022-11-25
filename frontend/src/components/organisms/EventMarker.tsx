import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { SetStateAction, Dispatch } from "react";
import EventSummaryOverlay from "./EventSummaryOverlay";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";

interface EventMarkerProps {
  eventInfo: EventSummaryResponseDto;
  setCurrentMarker: Dispatch<SetStateAction<number>>;
  isShow: boolean;
}

const EventMarker = (props: EventMarkerProps): JSX.Element => {
  const { eventInfo, setCurrentMarker, isShow } = props;
  const map = useMap();
  return (
    <>
      <MapMarker
        position={{
          lat: eventInfo.lat,
          lng: eventInfo.lng,
        }}
        onClick={(marker): void => {
          map.panTo(marker.getPosition());
          setCurrentMarker(eventInfo.eventId);
        }}
      />
      {isShow && <EventSummaryOverlay eventInfo={eventInfo} />}
    </>
  );
};

export default EventMarker;
