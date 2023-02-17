import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BaseButton from "../atoms/buttons/BaseButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";

const DetailAndBookmarkNavStyle = styled.div`
  display: flex;
  justify-content: center;
`;

interface DetailAndBookmarkNavProps {
  eventId: number;
  isBookmarked: boolean;
}

const DetailAndBookmarkNav = (
  props: DetailAndBookmarkNavProps
): JSX.Element => {
  const { eventId, isBookmarked } = props;
  const navigate = useNavigate();
  return (
    <DetailAndBookmarkNavStyle>
      <BaseButton
        theme={"overlay"}
        value={"상세보기"}
        handleClick={() => navigate(`/detail/${eventId}`)}
      />
      <BookmarkApiButton
        isBookmarked={isBookmarked}
        theme={"overlay"}
        eventId={eventId}
        value={isBookmarked ? "북마크 제거" : "북마크 추가"}
      />
    </DetailAndBookmarkNavStyle>
  );
};

export default DetailAndBookmarkNav;
