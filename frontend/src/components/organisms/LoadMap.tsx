import { Map } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { mapLocationChange } from "../../redux/slices/mapSlice";
import { EventBasicInfoResponseDto } from "../../types/dto/EventBasicInfoResponse.dto";
import EventMarker from "./EventMarker";

interface LoadMapProps {
  eventMarkers: EventBasicInfoResponseDto[];
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventMarkers } = props;
  const mapState = useAppSelector((state) => state.map);
  const [currentMarker, setCurrentMarker] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const geocoder = new kakao.maps.services.Geocoder();

  const callback = (result: any, status: string): void => {
    if (status === "OK")
      dispatch(
        mapLocationChange({
          lat: result[0].y,
          lng: result[0].x,
        })
      );
  };

  useEffect(() => {
    if (mapState.search !== "")
      geocoder.addressSearch(`${mapState.search}`, callback);
  }, [mapState.search]);

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
