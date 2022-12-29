import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import useKakaoSearch from "../../hooks/useKakaoSearch";
import { mapLevelSelect, mapCloseOverlay } from "../../redux/slices/mapSlice";
import { EventSummaryGroupResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import EventMarker from "./EventMarker";
import CityMarker from "./CityMarker";
import CityAccidentMarker from "./CityAccidentMarker";

interface LoadMapProps {
  eventInfo: EventSummaryGroupResponseDto[] | undefined;
  bookmarkInfo: EventSummaryGroupResponseDto[] | undefined;
  cityPeopleInfo: CityPeopleResponseDto[] | undefined;
  cityAccidentInfo: CityAccidentResponseDto[] | undefined;
}

const LoadMap = (props: LoadMapProps): JSX.Element => {
  const { eventInfo, bookmarkInfo, cityPeopleInfo, cityAccidentInfo } = props;

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
        dispatch(mapCloseOverlay());
      }}
      onZoomChanged={(map): void => {
        dispatch(mapLevelSelect(map.getLevel()));
      }}
      isPanto
      draggable={mapState.isEventOverlayShow === -1}
      zoomable={mapState.isEventOverlayShow === -1}
    >
      <>
        {mapState.isEventShow &&
          eventInfo?.map((event) => {
            return (
              <EventMarker
                key={event.eventSummaries[0].eventId}
                eventInfo={event}
                isShow={
                  mapState.isEventOverlayShow ===
                  event.eventSummaries[0].eventId
                }
                type="event"
              />
            );
          })}
        {mapState.isBookmarkShow &&
          bookmarkInfo?.map((event) => {
            return (
              <EventMarker
                key={event.eventSummaries[0].eventId}
                eventInfo={event}
                isShow={
                  mapState.isBookmarkOverlayShow ===
                  event.eventSummaries[0].eventId
                }
                type="bookmark"
              />
            );
          })}
        {mapState.isPeopleShow &&
          cityPeopleInfo?.map((people) => {
            return (
              <CityMarker
                key={people.cityId}
                cityPeopleInfo={people}
                isShow={mapState.isCityOverlayShow === people.cityId}
              />
            );
          })}
        {mapState.isAccidentShow &&
          cityAccidentInfo?.map((accident) => {
            return (
              <CityAccidentMarker
                key={accident.accidentId}
                cityAccidentInfo={accident}
                isShow={
                  mapState.isCityAccidentOverlayShow === accident.accidentId
                }
              />
            );
          })}
      </>
    </Map>
  );
};

export default LoadMap;
