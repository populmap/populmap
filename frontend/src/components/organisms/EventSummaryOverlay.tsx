import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import { axiosBookmarkPost } from "../../network/axios/axios.custom";

interface EventSummaryOverlayProps {
  eventInfo: EventSummaryResponseDto;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 7rem;
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

  return (
    <CustomOverlayMap
      position={{
        lat: eventInfo.lat + 0.001,
        lng: eventInfo.lng,
      }}
      clickable
    >
      <SummaryBox>
        <p style={{ paddingTop: "0.6rem", fontSize: "0.7rem" }}>
          {eventInfo.title}
        </p>
        <span
          style={{
            fontSize: "0.1rem",
            border: "0.01rem solid gray",
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
          api={axiosBookmarkPost}
        />
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
