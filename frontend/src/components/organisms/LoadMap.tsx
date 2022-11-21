import { Map } from "react-kakao-maps-sdk";
import { useAppSelector } from "../../redux/hook";
import { EventBasicInfoResponseDto } from "../../types/dto/EventBasicInfoResponse.dto";
import EventMarker from "../atoms/map/EventMarker";

interface LoadMapProps {
  eventMarkers: EventBasicInfoResponseDto[];
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventMarkers } = props;
  const mapState = useAppSelector((state) => state.map);
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
    >
      {eventMarkers.map((eventInfo) => {
        return <EventMarker key={eventInfo.eventId} eventInfo={eventInfo} />;
      })}
    </Map>
  );
};

export default LoadMap;
