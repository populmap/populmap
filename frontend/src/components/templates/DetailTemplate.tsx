import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { axiosEventSearchDetail } from "../../network/axios/axios.event";
import progressStatus, {
  EventDetailResponseDto,
} from "../../types/dto/EventDetailResponse.dto";
import DetailContent from "../organisms/DetailContent";

const DetailSection = styled.section`
  position: relative;
  top: 10%;
  height: 90%;
  width: 100%;
`;

const DetailTemplate = (): JSX.Element => {
  const mockData = {
    title: "크리스마스 행사 1",
    address: "서울시 성동구",
    lat: 37.4872,
    lng: 127.0638,
    eventId: 1,
    progress: progressStatus.INPROGRESS,
    call: "01012341234",
    description: "크리스마스에 진행되는 행사입니다",
    fee: "50000원",
    beginTime: new Date("2022-12-01"),
    endTime: new Date("2022-12-02"),
    modifiedDate: new Date("2022-11-31"),
    place: "독서당로40길 1234",
    url: "www.example.com",
  };

  const eventId = window.location.pathname.replace(/.*\//, "");
  const [detailResponse, setDetailResponse] =
    useState<EventDetailResponseDto>();

  useEffect(() => {
    axiosEventSearchDetail(parseInt(eventId, 10))
      .then((response: EventDetailResponseDto) => {
        setDetailResponse(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <DetailSection>
      <DetailContent detailResponse={mockData} />
    </DetailSection>
  );
};

export default DetailTemplate;
