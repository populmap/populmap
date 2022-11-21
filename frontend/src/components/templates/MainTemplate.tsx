import styled from "@emotion/styled";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import { useAppSelector } from "../../redux/hook";
import LoadMap from "../organisms/LoadMap";
import MapNav from "../organisms/MapNav";

const MainSection = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
`;

const MainTemplate = (): JSX.Element => {
  // KAKAO MAP API 호출
  const mockData = [
    {
      title: "크리스마스 행사 1",
      address: "서울시 성동구",
      lat: 37.4872,
      lng: 127.0638,
      eventId: 1,
    },
    {
      title: "크리스마스 행사 2",
      address: "서울시 성동구",
      lat: 37.4862,
      lng: 127.0628,
      eventId: 2,
    },
    {
      title: "크리스마스 행사 3",
      address: "서울시 성동구",
      lat: 37.4852,
      lng: 127.0618,
      eventId: 3,
    },
    {
      title: "크리스마스 행사 4",
      address: "서울시 성동구",
      lat: 37.4842,
      lng: 127.0608,
      eventId: 4,
    },
    {
      title: "크리스마스 행사 5",
      address: "서울시 성동구",
      lat: 37.4832,
      lng: 127.0598,
      eventId: 5,
    },
    {
      title: "크리스마스 행사 6",
      address: "서울시 성동구",
      lat: 37.4822,
      lng: 127.0588,
      eventId: 6,
    },
  ];
  const { loading, error } = useInjectKakaoMapApi({
    appkey: `${import.meta.env.VITE_KAKAO_MAP_KEY}`,
  });
  const mapState = useAppSelector((state) => state.map);
  return (
    <MainSection>
      {loading ? null : <LoadMap eventMarkers={mockData} />}
      <MapNav />
    </MainSection>
  );
};

export default MainTemplate;
