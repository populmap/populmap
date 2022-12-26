import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import LoadMap from "../organisms/LoadMap";
import MapNav from "../organisms/MapNav";
import {
  axiosCityPeople,
  axiosCityAccident,
} from "../../network/axios/axios.city";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";

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
      progress: "진행전",
    },
    {
      title: "크리스마스 행사 3",
      address: "서울시 성동구",
      lat: 37.4852,
      lng: 127.0618,
      eventId: 3,
      progress: "진행종료",
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
      address:
        "소쩍새는올빼미목 올빼미과의 한 종으로, 한국에서는 여름철새이다. 몸 길이는 20cm 정도로",
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

  const [cityPeopleInfo, setCityPeopleInfo] =
    useState<CityPeopleResponseDto[]>();
  const [cityAccidentInfo, setCityAccidentInfo] =
    useState<CityAccidentResponseDto[]>();

  useEffect(() => {
    axiosCityPeople()
      .then((response) => {
        setCityPeopleInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axiosCityAccident()
      .then((response) => {
        setCityAccidentInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MainSection>
      {loading ? null : (
        <LoadMap
          eventInfo={mockData}
          cityPeopleInfo={cityPeopleInfo}
          cityAccidentInfo={cityAccidentInfo}
        />
      )}
      <MapNav />
    </MainSection>
  );
};

export default MainTemplate;
