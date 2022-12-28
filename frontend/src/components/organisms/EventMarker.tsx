import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { SetStateAction, Dispatch } from "react";
import { useAppDispatch } from "../../redux/hook";
import { mapLocationChange } from "../../redux/slices/mapSlice";
import EventSummaryOverlay from "./EventSummaryOverlay";
import EventSummaryList from "./EventSummaryList";
import { EventSummaryGroupResponseDto } from "../../types/dto/EventSummaryResponse.dto";

interface EventMarkerProps {
  eventInfo: EventSummaryGroupResponseDto;
  setCurrentMarker: Dispatch<SetStateAction<number>>;
  isShow: boolean;
}

const EventMarker = (props: EventMarkerProps): JSX.Element => {
  const { eventInfo, setCurrentMarker, isShow } = props;
  const dispatch = useAppDispatch();
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
          dispatch(
            mapLocationChange({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng(),
            })
          );
          setCurrentMarker(eventInfo.eventSummaries[0].eventId);
        }}
        image={{
          src: "../../img/event.png",
          size: { width: 32, height: 32 },
        }}
      />
      {isShow &&
        (eventInfo.eventSummaries.length === 1 ? (
          <EventSummaryOverlay
            eventInfo={eventInfo.eventSummaries[0]}
            lat={eventInfo.lat}
            lng={eventInfo.lng}
          />
        ) : (
          <EventSummaryList
            eventList={eventInfo.eventSummaries}
            lat={eventInfo.lat}
            lng={eventInfo.lng}
          />
        ))}
    </>
  );
};

export default EventMarker;
