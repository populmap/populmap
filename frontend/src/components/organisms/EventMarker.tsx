import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { SetStateAction, Dispatch } from "react";
import EventIcon from "@mui/icons-material/Event";
import { useAppDispatch } from "../../redux/hook";
import { mapLocationChange } from "../../redux/slices/mapSlice";
import EventSummaryOverlay from "./EventSummaryOverlay";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";

interface EventMarkerProps {
  eventInfo: EventSummaryResponseDto;
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
          setCurrentMarker(eventInfo.eventId);
        }}
        image={{
          src: "https://img.icons8.com/material-outlined/24/null/planner.png",
          size: { width: 25, height: 25 },
        }}
      />
      {isShow && <EventSummaryOverlay eventInfo={eventInfo} />}
    </>
  );
};

export default EventMarker;
