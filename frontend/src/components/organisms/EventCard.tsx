import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DetailAndBookmarkNav from "./DetailAndBookmarkNav";
import { EventListDto } from "../../types/dto/EventPagiNationResponse.dto";
import colorTypes from "../../types/colorTypes";

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

/**
 * Bug : DB에 event의 isBookmarked가 정상적으로 저장되지 않고 있는 상황
 * - DB가 수정될 때까지 사용자 경험을 위해 접속한 페이지에 따라 일괄적으로 추가, 제거가 보이게 수정.
 * - isBookmarked 변수를 통해 접속한 페이지를 boolean type으로 저장.
 * - 유저가 접속한 페이지가 event인 경우 '북마크 추가'
 * - 유저가 접속한 페이지가 bookmark인 경우 '북마크 제거'
 *
 */
const EventCard = (props: EventCardProps): JSX.Element => {
  const { cardInfo } = props;
  const navigate = useNavigate();
  const isBookmarked = window.location.pathname === "/bookmark";

  return (
    <EventCardStyle onClick={() => navigate(`/detail/${cardInfo.eventId}`)}>
      <InformationStyle>
        <h2>{cardInfo?.title}</h2>
        <p>{cardInfo?.address}</p>
        {cardInfo?.call && (
          <p>
            <a
              style={{ textDecoration: "none", color: colorTypes.blue }}
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
        // isBookmarked={cardInfo.isBookmarked}
        isBookmarked={isBookmarked}
      />
    </EventCardStyle>
  );
};

export default EventCard;
