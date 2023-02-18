import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import LoadMap from "../organisms/LoadMap";
import SelectBox from "../organisms/SelectBox";
import MapFilter from "../organisms/MapFilter";
import MapNav from "../organisms/MapNav";
import {
  axiosCityPeople,
  axiosCityAccident,
} from "../../network/axios/axios.city";
import {
  axiosEventSearchSummary,
  axiosEventBookmarkSummary,
} from "../../network/axios/axios.event";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import { EventSummaryGroupResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import { useAppSelector } from "../../redux/hook";
import useGetToken from "../../hooks/useGetToken";

const MainSectionStyle = styled.section`
  height: 90vh;
  position: relative;
`;

const SelectBoxStyle = styled.div`
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const MapFilterStyle = styled.div`
  position: absolute;
  top: 7%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, 0);
`;

const MapNavStyle = styled.div`
  position: absolute;
  top: 15%;
  left: 6%;
`;

const MainTemplate = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const [cityPeopleInfo, setCityPeopleInfo] =
    useState<CityPeopleResponseDto[]>();
  const [cityAccidentInfo, setCityAccidentInfo] =
    useState<CityAccidentResponseDto[]>();
  const [eventInfo, setEventInfo] = useState<EventSummaryGroupResponseDto[]>();
  const [bookmarkInfo, setBookmarkInfo] =
    useState<EventSummaryGroupResponseDto[]>();
  const [city, setCity] = useState<string>("전국");
  const [progress, setProgress] = useState<string>("전체");

  useGetToken();
  useEffect((): void => {
    axiosEventSearchSummary(city, progress)
      .then((response) => {
        setEventInfo(response.data);
      })
      .catch((error) => console.error(error));
  }, [city, progress]);

  useEffect((): void => {
    if (user.userId !== -1) {
      axiosEventBookmarkSummary(city, progress)
        .then((response) => {
          setBookmarkInfo(response.data);
        })
        .catch((error) => console.error(error));
    }
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
    <MainSectionStyle>
      <LoadMap
        eventInfo={eventInfo}
        bookmarkInfo={bookmarkInfo}
        cityPeopleInfo={cityPeopleInfo}
        cityAccidentInfo={cityAccidentInfo}
      />
      <SelectBoxStyle>
        <SelectBox setCity={setCity} setProgress={setProgress} />
      </SelectBoxStyle>
      <MapFilterStyle>
        <MapFilter />
      </MapFilterStyle>
      <MapNavStyle>
        <MapNav />
      </MapNavStyle>
    </MainSectionStyle>
  );
};

export default MainTemplate;
