import styled from "@emotion/styled";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import LoadMap from "../organisms/LoadMap";
import MapNav from "../organisms/MapNav";

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

  return (
    <MainSection>
      {loading ? null : <LoadMap />}
      <MapNav />
    </MainSection>
  );
};

export default MainTemplate;
