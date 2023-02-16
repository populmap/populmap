import { memo } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { useAppDispatch } from "../../redux/hook";
import CityAccidentMarkerOverlay from "./CityAccidentMarkerOverlay";
import { mapLocationChange } from "../../redux/slices/mapSlice";
import {
  overlaySetIsCityAccidentOverlayNumber,
  overlayClose,
} from "../../redux/slices/overlaySlice";

interface CityAccidentMarkerProps {
  cityAccidentInfo: CityAccidentResponseDto;
  isShow: boolean;
}

const CityAccidentMarker = (props: CityAccidentMarkerProps): JSX.Element => {
  const { cityAccidentInfo, isShow } = props;
  const dispatch = useAppDispatch();
  const map = useMap();

  return (
    <>
      <MapMarker
        position={{
          lat: cityAccidentInfo.lat,
          lng: cityAccidentInfo.lng,
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
          dispatch(
            overlaySetIsCityAccidentOverlayNumber(cityAccidentInfo.accidentId)
          );
        }}
        image={{
          src: "../../img/accident.png",
          size: { width: 32, height: 32 },
        }}
      />
      {isShow && (
        <CityAccidentMarkerOverlay cityAccidentInfo={cityAccidentInfo} />
      )}
    </>
  );
};

export default memo(CityAccidentMarker);
