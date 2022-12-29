import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  EventSummaryResponseDto,
  EventSummaryGroupResponseDto,
} from "../../types/dto/EventSummaryResponse.dto";
import { progressColor } from "../../types/dto/EventSummaryResponse.dto";
import DetailBookmarkNav from "./DetailBookmarkNav";

interface EventSummaryOverlayProps {
  eventInfo: EventSummaryResponseDto;
  lat: number;
  lng: number;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 9rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.5rem;
  padding: 1rem;
`;

const DetailBookmarkNavStyle = styled.div`
  position: absolute;
  top: 80%;
  left: 10%;
`;

const EventSummaryOverlay = (props: EventSummaryOverlayProps): JSX.Element => {
  const { eventInfo, lat, lng } = props;
  const navigate = useNavigate();

  return (
    <CustomOverlayMap
      position={{
        lat: lat,
        lng: lng,
      }}
      clickable
    >
      <SummaryBox
        onClick={(): void => navigate(`/detail/${eventInfo.eventId}`)}
      >
        <p
          style={{
            fontSize: "0.7rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {eventInfo.title}
        </p>
        <p
          style={{
            height: "1rem",
            fontSize: "0.5rem",
            border: `0.01rem solid ${progressColor(eventInfo.progress)}`,
            borderRadius: "0.2rem",
            backgroundColor: `${progressColor(eventInfo.progress)}`,
          }}
        >
          {eventInfo.progress}
        </p>
        <p style={{ whiteSpace: "normal" }}>{eventInfo.address}</p>
        <DetailBookmarkNavStyle>
          <DetailBookmarkNav
            eventId={eventInfo.eventId}
            isBookmarked={eventInfo.isBookmarked}
          />
        </DetailBookmarkNavStyle>
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
