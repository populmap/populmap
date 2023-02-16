import { memo } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useAppDispatch } from "../../redux/hook";
import { mapLocationChange } from "../../redux/slices/mapSlice";
import {
  overlaySetIsEventOverlayNumber,
  overlaySetIsBookmarkOverlayNumber,
  overlayClose,
} from "../../redux/slices/overlaySlice";

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
  const eventType = type === "event";

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
          dispatch(overlayClose());
          eventType
            ? dispatch(
                overlaySetIsEventOverlayNumber(
                  eventInfo.eventSummaries[0].eventId
                )
              )
            : dispatch(
                overlaySetIsBookmarkOverlayNumber(
                  eventInfo.eventSummaries[0].eventId
                )
              );
        }}
        zIndex={eventType ? -1 : -2}
        image={{
          src: eventType ? EventImage : BookmarkImage,
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

export default memo(EventMarker);
