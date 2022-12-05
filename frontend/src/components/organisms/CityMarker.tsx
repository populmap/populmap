import { Circle, useMap } from "react-kakao-maps-sdk";
import { Dispatch, SetStateAction } from "react";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import { useAppDispatch } from "../../redux/hook";
import CityMarkerOverlay from "./CityMarkerOverlay";
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

  return (
    <>
      <Circle
        center={{
          // lat: cityPeopleInfo.lat,
          // lng: cityPeopleInfo.lng,
          lat: cityPeopleInfo.lng,
          lng: cityPeopleInfo.lat,
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
        radius={50}
        strokeWeight={5} // 선의 두께입니다
        strokeColor="#75B8FA" // 선의 색깔입니다
        strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle="dash" // 선의 스타일 입니다
        fillColor="#CFE7FF" // 채우기 색깔입니다
        fillOpacity={0.7} // 채우기 불투명도 입니다
      />
      {isShow && <CityMarkerOverlay cityPeopleInfo={cityPeopleInfo} />}
    </>
  );
};

export default CityMarker;
