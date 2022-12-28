import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import LoadMap from "../organisms/LoadMap";
import SelectBox from "../organisms/SelectBox";
import MapFilter from "../organisms/MapFilter";
import MapNav from "../organisms/MapNav";
import {
  axiosCityPeople,
  axiosCityAccident,
} from "../../network/axios/axios.city";
import { axiosEventSearchSummary } from "../../network/axios/axios.event";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import { EventSummaryGroupResponseDto } from "../../types/dto/EventSummaryResponse.dto";

const MainSection = styled.section`
  position: relative;
  top: 10%;
  height: 90%;
  width: 100%;
`;

const SelectBoxStyle = styled.div`
  position: absolute;
  width: 100%;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0%);
  touch-action: none;
`;

const MainTemplate = (): JSX.Element => {
  const { loading, error } = useInjectKakaoMapApi({
    appkey: `${import.meta.env.VITE_KAKAO_MAP_KEY}`,
    libraries: ["services"],
  });

  const [cityPeopleInfo, setCityPeopleInfo] =
    useState<CityPeopleResponseDto[]>();
  const [cityAccidentInfo, setCityAccidentInfo] =
    useState<CityAccidentResponseDto[]>();
  const [eventInfo, setEventInfo] = useState<EventSummaryGroupResponseDto[]>();
  const [city, setCity] = useState<string>("전국");
  const [progress, setProgress] = useState<string>("전체");

  useEffect((): void => {
    axiosEventSearchSummary(city, progress)
      .then((response) => {
        setEventInfo(response.data);
      })
      .catch((error) => console.error(error));
  }, [city, progress]);

  useEffect((): void => {
    axiosCityPeople()
      .then((response) => {
        setCityPeopleInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect((): void => {
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
          eventInfo={eventInfo}
          cityPeopleInfo={cityPeopleInfo}
          cityAccidentInfo={cityAccidentInfo}
        />
      )}
      <MapFilter />
      <SelectBoxStyle>
        <SelectBox setCity={setCity} setProgress={setProgress} />
      </SelectBoxStyle>
      <MapNav />
    </MainSection>
  );
};

export default MainTemplate;
