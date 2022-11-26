import styled from "@emotion/styled";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import LoadMap from "../organisms/LoadMap";
import MapNav from "../organisms/MapNav";

const MainSection = styled.section`
  position: relative;
  top: 10%;
  height: 90%;
  width: 100%;
`;

const MainTemplate = (): JSX.Element => {
  const mockData = [
    {
      title: "크리스마스 행사 1",
      address: "서울시 성동구",
      lat: 37.4872,
      lng: 127.0638,
      eventId: 1,
      progress: "진행중",
    },
    {
      title: "크리스마스 행사 2",
      address: "서울시 성동구",
      lat: 37.4862,
      lng: 127.0628,
      eventId: 2,
      progress: "진행중",
    },
    {
      title: "크리스마스 행사 3",
      address: "서울시 성동구",
      lat: 37.4852,
      lng: 127.0618,
      eventId: 3,
      progress: "진행중",
    },
    {
      title: "크리스마스 행사 4",
      address: "서울시 성동구",
      lat: 37.4842,
      lng: 127.0608,
      eventId: 4,
      progress: "진행중",
    },
    {
      title: "크리스마스 행사 5",
      address: "서울시 성동구",
      lat: 37.4832,
      lng: 127.0598,
      eventId: 5,
      progress: "진행중",
    },
    {
      title:
        "크리스마스 행사 6 타이틀이 길면 어떻게 될까욜ㅇㄹㅇㄹㅇㄹㅇㄹㅇㄹㅇㄹㅇㄹㅇㄹ",
      address: "서울시 성동구",
      lat: 37.4822,
      lng: 127.0588,
      eventId: 6,
      progress: "진행중",
    },
  ];
  const { loading, error } = useInjectKakaoMapApi({
    appkey: `${import.meta.env.VITE_KAKAO_MAP_KEY}`,
    libraries: ["services"],
  });

  return (
    <MainSection>
      {loading ? null : <LoadMap eventMarkers={mockData} />}
      <MapNav />
    </MainSection>
  );
};

export default MainTemplate;
