import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { EventListDto } from "../../types/dto/EventPagiNationResponse.dto";
import DetailBookmarkNav from "./DetailBookmarkNav";

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
  margin: 1rem 0 2rem 0.9rem;
  height: 5rem;
`;

const DetailBookmarkNavStyle = styled.div`
  position: absolute;
  top: 80%;
  left: 10%;
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
            <a href={`tel:${cardInfo?.call}`}>{cardInfo?.call}</a>
          </p>
        )}
        {cardInfo?.progress && <p>{cardInfo?.progress}</p>}
        {(cardInfo?.beginTime || cardInfo?.endTime) && (
          <p>
            {dayjs(cardInfo?.beginTime).format("YYYY/MM/DD HH:mm")} {" ~ "}
            {dayjs(cardInfo?.endTime).format("YYYY/MM/DD HH:mm")}
          </p>
        )}
      </InformationStyle>
      <DetailBookmarkNav eventId={cardInfo.eventId} />
    </EventCardStyle>
  );
};

export default EventCard;
