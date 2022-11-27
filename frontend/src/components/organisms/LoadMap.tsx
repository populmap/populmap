import { Map } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { mapLocationChange, mapLevelSelect } from "../../redux/slices/mapSlice";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import EventMarker from "./EventMarker";

interface LoadMapProps {
  eventMarkers: EventSummaryResponseDto[];
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventMarkers } = props;
  const mapState = useAppSelector((state) => state.map);
  const [currentMarker, setCurrentMarker] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const geocoder = new kakao.maps.services.Geocoder();
  const ps = new kakao.maps.services.Places();

  useEffect(() => {
    const callback = (result: any, status: string): void => {
      if (status === "OK")
        dispatch(
          mapLocationChange({
            lat: result[0].y,
            lng: result[0].x,
          })
        );
      else alert("검색결과가 없습니다.");
    };

    if (mapState.search !== "")
      geocoder.addressSearch(
        `${mapState.search}`,
        (result: any, status: string) => {
          if (status === "OK") callback(result, status);
          else ps.keywordSearch(`${mapState.search}`, callback);
        }
      );
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
      onZoomChanged={(map): void => {
        dispatch(mapLevelSelect(map.getLevel()));
      }}
      isPanto
    >
      {eventMarkers.map((eventInfo) => {
        return (
          <EventMarker
            key={eventInfo.eventId}
            eventInfo={eventInfo}
            isShow={currentMarker === eventInfo.eventId}
            setCurrentMarker={setCurrentMarker}
          />
        );
      })}
    </Map>
  );
};

export default LoadMap;
