import { memo } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import {
  CityPeopleResponseDto,
  setImage,
} from "../../types/dto/CityPeopleResponse.dto";
import { useAppDispatch } from "../../redux/hook";
import CityMarkerOverlay from "./CityMarkerOverlay";
import { mapLocationChange } from "../../redux/slices/mapSlice";

import {
  overlaySetIsCityOverlayNumber,
  overlayClose,
} from "../../redux/slices/overlaySlice";

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
          dispatch(overlayClose());
          dispatch(overlaySetIsCityOverlayNumber(cityPeopleInfo.cityId));
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

export default memo(CityMarker);
