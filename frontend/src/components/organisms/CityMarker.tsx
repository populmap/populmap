import { MapMarker, useMap } from "react-kakao-maps-sdk";
import densityLevel, {
  CityPeopleResponseDto,
  setImage,
} from "../../types/dto/CityPeopleResponse.dto";
import { useAppDispatch } from "../../redux/hook";
import CityMarkerOverlay from "./CityMarkerOverlay";
import {
  mapLocationChange,
  mapSetIsCityOverlayShow,
  mapCloseOverlay,
} from "../../redux/slices/mapSlice";

interface CityMarkerProps {
  cityPeopleInfo: CityPeopleResponseDto;
  isShow: boolean;
}

const CityMarker = (props: CityMarkerProps): JSX.Element => {
  const { cityPeopleInfo, isShow } = props;
  const map = useMap();
  const dispatch = useAppDispatch();

  return (
    <>
      <MapMarker
        position={{
          lat: cityPeopleInfo.lat,
          lng: cityPeopleInfo.lng,
        }}
        onClick={(marker): void => {
          map.panTo(marker.getPosition());
          dispatch(
            mapLocationChange({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng(),
            })
          );
          dispatch(mapCloseOverlay());
          dispatch(mapSetIsCityOverlayShow(cityPeopleInfo.cityId));
        }}
        image={{
          src: setImage(cityPeopleInfo.level),
          size: { width: 32, height: 32 },
        }}
      />
      {isShow && <CityMarkerOverlay cityPeopleInfo={cityPeopleInfo} />}
    </>
  );
};

export default CityMarker;
