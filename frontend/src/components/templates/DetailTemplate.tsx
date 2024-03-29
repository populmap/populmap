import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { axiosEventSearchDetail } from "../../network/axios/axios.event";
import { EventDetailResponseDto } from "../../types/dto/EventDetailResponse.dto";
import DetailContent from "../organisms/DetailContent";

const DetailSection = styled.section``;

const DetailTemplate = (): JSX.Element => {
  const eventId = window.location.pathname.replace(/.*\//, "");
  const [detailResponse, setDetailResponse] =
    useState<EventDetailResponseDto>();

  useEffect(() => {
    axiosEventSearchDetail(parseInt(eventId, 10))
      .then((response) => {
        setDetailResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DetailSection>
      <DetailContent detailResponse={detailResponse} />
    </DetailSection>
  );
};

export default DetailTemplate;
