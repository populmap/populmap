import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useState } from "react";
import { EventBasicInfoResponseDto } from "../../../types/dto/EventBasicInfoResponse.dto";

interface EventMarkerProps {
  eventInfo: EventBasicInfoResponseDto;
}

const EventMarker = (props: EventMarkerProps): JSX.Element => {
  const { eventInfo } = props;
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MapMarker
      position={{
        lat: eventInfo.lat,
        lng: eventInfo.lng,
      }}
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && (
        <div>
          <span>{eventInfo.title}</span>
        </div>
      )}
    </MapMarker>
  );
};

export default EventMarker;
