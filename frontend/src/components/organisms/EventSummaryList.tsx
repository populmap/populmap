import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { EventSummaryResponseDto } from "../../types/dto/EventSummaryResponse.dto";

interface EventSummaryListProps {
  eventList: EventSummaryResponseDto[];
  lat: number;
  lng: number;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: white;
  font-size: 0.5rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const ListButtonStyle = styled.button`
  font-size: 0.7rem;
  color: black;
  height: 2rem;
  border: 0;
  border-bottom: 0.05rem solid lightgray;
  background-color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 0;
`;

const EventSummaryList = (props: EventSummaryListProps): JSX.Element => {
  const { eventList, lat, lng } = props;
  const navigate = useNavigate();
  return (
    <CustomOverlayMap
      position={{
        lat: lat,
        lng: lng,
      }}
      clickable
    >
      <SummaryBox>
        {eventList.map((event, index) => {
          return (
            <ListButtonStyle
              key={index}
              onClick={() => navigate(`/detail/${event.eventId}`)}
            >
              {event.title}
            </ListButtonStyle>
          );
        })}
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default EventSummaryList;
