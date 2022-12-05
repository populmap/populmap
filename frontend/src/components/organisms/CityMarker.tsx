import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { Dispatch, SetStateAction } from "react";
import densityLevel, {
  CityPeopleResponseDto,
} from "../../types/dto/CityPeopleResponse.dto";
import { useAppDispatch } from "../../redux/hook";
import CityMarkerOverlay from "./CityMarkerOverlay";
import orangeCircle from "../../../img/orangeCircle.png";
import greenCircle from "../../../img/greenCircle.png";
import yellowCircle from "../../../img/yellowCircle.png";
import redCircle from "../../../img/redCircle.png";
import { mapLocationChange } from "../../redux/slices/mapSlice";

interface CityMarkerProps {
  cityPeopleInfo: CityPeopleResponseDto;
  setCurrentMarker: Dispatch<SetStateAction<number>>;
  isShow: boolean;
}

const CityMarker = (props: CityMarkerProps): JSX.Element => {
  const { cityPeopleInfo, setCurrentMarker, isShow } = props;
  const map = useMap();
  const dispatch = useAppDispatch();

  const setImage = (status: string): string => {
    switch (status) {
      case densityLevel.SMOOTH:
        return greenCircle;
      case densityLevel.NORMAL:
        return yellowCircle;
      case densityLevel.CROWDED:
        return orangeCircle;
      case densityLevel.VERYCROWDED:
        return redCircle;
      default:
        return "";
    }
  };

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
          setCurrentMarker(cityPeopleInfo.cityId);
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
