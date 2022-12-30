import { Map } from "react-kakao-maps-sdk";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import useKakaoSearch from "../../hooks/useKakaoSearch";
import { mapLevelSelect } from "../../redux/slices/mapSlice";
import { overlayClose } from "../../redux/slices/overlaySlice";
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
  const overlayState = useAppSelector((state) => state.overlay);
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
        dispatch(overlayClose());
      }}
      onZoomChanged={(map): void => {
        dispatch(mapLevelSelect(map.getLevel()));
      }}
      isPanto
      draggable={overlayState.isEventOverlayNumber === -1}
      zoomable={overlayState.isEventOverlayNumber === -1}
    >
      <>
        {mapState.isBookmarkShow &&
          bookmarkInfo?.map((event) => {
            return (
              <EventMarker
                key={event.eventSummaries[0].eventId}
                eventInfo={event}
                isShow={
                  overlayState.isBookmarkOverlayNumber ===
                  event.eventSummaries[0].eventId
                }
                type="bookmark"
              />
            );
          })}
        {mapState.isEventShow &&
          eventInfo?.map((event) => {
            return (
              <EventMarker
                key={event.eventSummaries[0].eventId}
                eventInfo={event}
                isShow={
                  overlayState.isEventOverlayNumber ===
                  event.eventSummaries[0].eventId
                }
                type="event"
              />
            );
          })}
        {mapState.isPeopleShow &&
          cityPeopleInfo?.map((people) => {
            return (
              <CityMarker
                key={people.cityId}
                cityPeopleInfo={people}
                isShow={overlayState.isCityOverlayNumber === people.cityId}
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
                  overlayState.isCityAccidentOverlayNumber ===
                  accident.accidentId
                }
              />
            );
          })}
      </>
    </Map>
  );
};

export default LoadMap;
