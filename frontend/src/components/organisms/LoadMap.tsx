import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { EventBasicInfoResponseDto } from "../../types/dto/EventBasicInfoResponse.dto";
import EventMarker from "../atoms/map/EventMarker";

interface LoadMapProps {
  eventMarkers: EventBasicInfoResponseDto[];
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventMarkers } = props;
  const mapState = useAppSelector((state) => state.map);
  const [currentMarker, setCurrentMarker] = useState<number>(-1);

  return (
    <Map
      center={{
        lat: mapState.center.lat,
        lng: mapState.center.lng,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
      }}
      level={mapState.level}
      onClick={(): void => {
        setCurrentMarker(-1);
      }}
    >
      {eventMarkers.map((eventInfo) => {
        return (
          <EventMarker
            key={eventInfo.eventId}
            eventInfo={eventInfo}
            currentMarker={currentMarker}
            setCurrentMarker={setCurrentMarker}
          />
        );
      })}
    </Map>
  );
};

export default LoadMap;
