import { Map } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { mapLocationChange, mapLevelSelect } from "../../redux/slices/mapSlice";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import EventMarker from "./EventMarker";
import CityMarker from "./CityMarker";
import CityAccidentMarker from "./CityAccidentMarker";
import MapFilter from "./MapFilter";

interface LoadMapProps {
  eventInfo: EventSummaryResponseDto[] | undefined;
  cityPeopleInfo: CityPeopleResponseDto[] | undefined;
  cityAccidentInfo: CityAccidentResponseDto[] | undefined;
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventInfo, cityPeopleInfo, cityAccidentInfo } = props;
  const mapState = useAppSelector((state) => state.map);
  const [currentMarker, setCurrentMarker] = useState<number>(-1);
  const [isEventShow, setIsEventShow] = useState<boolean>(false);
  const [isBookmarkShow, setIsBookmarkShow] = useState<boolean>(false);
  const [isPeopleShow, setIsPeopleShow] = useState<boolean>(false);
  const [isAccidentShow, setIsAccidentShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const geocoder = new kakao.maps.services.Geocoder();
  const ps = new kakao.maps.services.Places();

  useEffect(() => {
    const callback = (result: any, status: string): void => {
      if (status === "OK") {
        dispatch(
          mapLocationChange({
            lat: result[0].y,
            lng: result[0].x,
          })
        );
        setIsEventShow(true);
        setIsBookmarkShow(true);
        setIsPeopleShow(true);
        setIsAccidentShow(true);
      } else alert("검색결과가 없습니다.");
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
      <>
        <MapFilter
          isEventShow={isEventShow}
          isBookmarkShow={isBookmarkShow}
          isPeopleShow={isPeopleShow}
          isAccidentShow={isAccidentShow}
          setIsEventShow={setIsEventShow}
          setIsPeopleShow={setIsPeopleShow}
          setIsBookmarkShow={setIsBookmarkShow}
          setIsAccidentShow={setIsAccidentShow}
        />
        {isEventShow &&
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
        {isPeopleShow &&
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
        {isAccidentShow &&
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
