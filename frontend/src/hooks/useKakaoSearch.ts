import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  mapLocationChange,
  mapLevelSelect,
  mapSearch,
} from "../redux/slices/mapSlice";

const useKakaoSearch = (): void => {
  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);
  const geocoder = new kakao.maps.services.Geocoder();
  const ps = new kakao.maps.services.Places();

  const callback = (result: any, status: string): void => {
    if (status === "OK") {
      dispatch(mapLevelSelect(3));
      dispatch(
        mapLocationChange({
          lat: result[0].y,
          lng: result[0].x,
        })
      );
    } else {
      dispatch(mapSearch(""));
      alert("검색결과가 없습니다.");
    }
  };

  useEffect(() => {
    if (mapState.search !== "")
      geocoder.addressSearch(
        `${mapState.search}`,
        (result: any, status: string) => {
          if (status === "OK") callback(result, status);
          else ps.keywordSearch(`${mapState.search}`, callback);
        }
      );
  }, [mapState.search]);
};

export default useKakaoSearch;
