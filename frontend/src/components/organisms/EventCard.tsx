import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { EventListDto } from "../../types/dto/EventPagiNationResponse.dto";
import DetailAndBookmarkNav from "./DetailAndBookmarkNav";

interface EventCardProps {
  cardInfo: EventListDto;
}

const EventCardStyle = styled.div`
  text-align: left;
  width: 20rem;
  height: 10rem;
  margin: 0.5rem;
  border: 0.05rem solid gray;
  border-radius: 1rem;
  flex-shrink: 0;
  font-size: 0.4rem;
`;

const InformationStyle = styled.div`
  margin: 0.5rem 1rem;
  height: 7rem;
`;

const EventCard = (props: EventCardProps): JSX.Element => {
  const { cardInfo } = props;
  const navigate = useNavigate();

  return (
    <EventCardStyle onClick={() => navigate(`/detail/${cardInfo.eventId}`)}>
      <InformationStyle>
        <h2>{cardInfo?.title}</h2>
        <p>{cardInfo?.address}</p>
        {cardInfo?.call && (
          <p>
            <a
              style={{ textDecoration: "none", color: "#1b73e8" }}
              href={`tel:${cardInfo?.call}`}
            >
              {cardInfo?.call}
            </a>
          </p>
        )}
        {cardInfo?.progress && <p>{cardInfo?.progress}</p>}
        {(cardInfo?.beginTime || cardInfo?.endTime) && (
          <p>
            {`${dayjs(cardInfo?.beginTime).format("YYYY/MM/DD HH:mm")}`} {" ~ "}
            {`${dayjs(cardInfo?.endTime).format("YYYY/MM/DD HH:mm")}`}
          </p>
        )}
      </InformationStyle>
      <DetailAndBookmarkNav
        eventId={cardInfo.eventId}
        isBookmarked={cardInfo.isBookmarked}
      />
    </EventCardStyle>
  );
};

export default EventCard;
