import styled from "@emotion/styled";
import BaseButton from "../atoms/buttons/BaseButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import {
  axiosEventBookmarkPost,
  axiosEventBookmarkDelete,
} from "../../network/axios/axios.event";
import { useNavigate } from "react-router-dom";

const ButtonStyle = {
  fontSize: "0.5rem",
  height: "1.5rem",
  width: "4rem",
  color: "#3d75cc",
};

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
        value="상세보기"
        handleClick={() => navigate(`/detail/${eventId}`)}
      />
      {isBookmarked ? (
        <BookmarkApiButton
          style={ButtonStyle}
          iconDisplay={false}
          param={eventId}
          value="북마크 제거"
          api={axiosEventBookmarkDelete}
        />
      ) : (
        <BookmarkApiButton
          style={ButtonStyle}
          iconDisplay={false}
          param={eventId}
          value="북마크 추가"
          api={axiosEventBookmarkPost}
        />
      )}
    </DetailAndBookmarkNavStyle>
  );
};

export default DetailAndBookmarkNav;
