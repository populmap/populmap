import styled from "@emotion/styled";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import UserMarker from "../atoms/map/userMarker";
import LoadMap from "../organisms/LoadMap";
import MapNav from "../organisms/MapNav";
import { useAppSelector } from "../../redux/hook";

const MainSection = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
`;

const MainTemplate = (): JSX.Element => {
  // KAKAO MAP API 호출
  const { loading, error } = useInjectKakaoMapApi({
    appkey: `${import.meta.env.VITE_KAKAO_MAP_KEY}`,
  });
  const mapState = useAppSelector((state) => state.map);
  return (
    <MainSection>
      {loading ? null : (
        <LoadMap>
          {/* <UserMarker center={mapState.center} /> */}
          <MapNav />
        </LoadMap>
      )}
    </MainSection>
  );
};

export default MainTemplate;
