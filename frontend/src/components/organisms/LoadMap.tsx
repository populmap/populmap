import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import useKakaoSearch from "../../hooks/useKakaoSearch";
import { mapLevelSelect } from "../../redux/slices/mapSlice";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import EventMarker from "./EventMarker";
import CityMarker from "./CityMarker";
import CityAccidentMarker from "./CityAccidentMarker";

interface LoadMapProps {
  eventInfo: EventSummaryResponseDto[] | undefined;
  cityPeopleInfo: CityPeopleResponseDto[] | undefined;
  cityAccidentInfo: CityAccidentResponseDto[] | undefined;
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventInfo, cityPeopleInfo, cityAccidentInfo } = props;
  const [currentMarker, setCurrentMarker] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);
  useKakaoSearch();

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
      <>
        {mapState.isEventShow &&
          eventInfo?.map((event) => {
            return (
              <EventMarker
                key={event.eventId}
                eventInfo={event}
                isShow={currentMarker === event.eventId}
                setCurrentMarker={setCurrentMarker}
              />
            );
          })}
        {mapState.isPeopleShow &&
          cityPeopleInfo?.map((people) => {
            return (
              <CityMarker
                key={people.cityId}
                cityPeopleInfo={people}
                isShow={currentMarker === people.cityId}
                setCurrentMarker={setCurrentMarker}
              />
            );
          })}
        {mapState.isAccidentShow &&
          cityAccidentInfo?.map((accident) => {
            return (
              <CityAccidentMarker
                key={accident.accidentId}
                cityAccidentInfo={accident}
                isShow={currentMarker === accident.accidentId}
                setCurrentMarker={setCurrentMarker}
              />
            );
          })}
      </>
    </Map>
  );
};

export default LoadMap;
