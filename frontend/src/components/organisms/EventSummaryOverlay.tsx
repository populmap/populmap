import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import progressStatus from "../../types/dto/EventDetailResponse.dto";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import { axiosEventBookmarkPost } from "../../network/axios/axios.event";

interface EventSummaryOverlayProps {
  eventInfo: EventSummaryResponseDto;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.5rem;
`;

const ButtonStyle = {
  border: "0.01rem solid gray",
  fontSize: "0.5rem",
  height: "1.5rem",
};

const EventSummaryOverlay = (props: EventSummaryOverlayProps): JSX.Element => {
  const { eventInfo } = props;
  const navigate = useNavigate();
  const progressColor = (status: string): string => {
    switch (status) {
      case progressStatus.BEFOREPROGRESS:
        return "#ff6f0f";
      case progressStatus.INPROGRESS:
        return "#18ce5f";
      case progressStatus.AFTERPROGRESS:
        return "#ff0200";
      default:
        return "#ffffff";
    }
  };

  return (
    <CustomOverlayMap
      position={{
        lat: eventInfo.lat,
        lng: eventInfo.lng,
      }}
      clickable
    >
      <SummaryBox
        onClick={(): void => navigate(`/detail/${eventInfo.eventId}`)}
      >
        <p style={{ paddingTop: "0.6rem", fontSize: "0.7rem", textOverflow: "ellipsis", overflow: "hidden"}}>
          {eventInfo.title}
        </p>
        <hr style={{ width: "80%" }} />
        <span
          style={{
            fontSize: "0.5rem",
            border: `0.01rem solid ${progressColor(eventInfo.progress)}`,
            borderRadius: "0.2rem",
            backgroundColor: `${progressColor(eventInfo.progress)}`,
            padding: "0.07rem"
          }}
        >
          {eventInfo.progress}
        </span>
        <p>{eventInfo.address}</p>
        <PageNavigateButton
          style={ButtonStyle}
          value="상세보기"
          route={`/detail/${eventInfo.eventId}`}
        />
        <BookmarkApiButton
          style={ButtonStyle}
          param={eventInfo.eventId}
          value="북마크 추가"
          api={axiosEventBookmarkPost}
        />
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
