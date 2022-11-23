import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { SetStateAction, Dispatch } from "react";
import EventSummaryOverlay from "./EventSummaryOverlay";
import { EventBasicInfoResponseDto } from "../../types/dto/EventBasicInfoResponse.dto";

interface EventMarkerProps {
  eventInfo: EventBasicInfoResponseDto;
  currentMarker: number;
  setCurrentMarker: Dispatch<SetStateAction<number>>;
}

const EventMarker = (props: EventMarkerProps): JSX.Element => {
  const { eventInfo, currentMarker, setCurrentMarker } = props;
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
      {currentMarker === eventInfo.eventId && (
        <EventSummaryOverlay
          position={{
            lat: eventInfo.lat,
            lng: eventInfo.lng,
          }}
        />
      )}
    </>
  );
};

export default EventMarker;
