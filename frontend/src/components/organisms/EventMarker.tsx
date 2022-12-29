import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useAppDispatch } from "../../redux/hook";
import {
  mapLocationChange,
  mapSetIsEventOverlayShow,
  mapSetIsBookmarkOverlayShow,
  mapCloseOverlay,
} from "../../redux/slices/mapSlice";
import EventSummaryOverlay from "./EventSummaryOverlay";
import EventSummaryList from "./EventSummaryList";
import { EventSummaryGroupResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import EventImage from "../../../img/event.png";
import BookmarkImage from "../../../img/bookmark.png";

interface EventMarkerProps {
  eventInfo: EventSummaryGroupResponseDto;
  isShow: boolean;
  type: string;
}

const EventMarker = (props: EventMarkerProps): JSX.Element => {
  const { eventInfo, isShow, type } = props;
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
          dispatch(mapCloseOverlay());
          type === "event"
            ? dispatch(
                mapSetIsEventOverlayShow(eventInfo.eventSummaries[0].eventId)
              )
            : dispatch(
                mapSetIsBookmarkOverlayShow(eventInfo.eventSummaries[0].eventId)
              );
        }}
        image={{
          src: type === "event" ? EventImage : BookmarkImage,
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
