import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import { axiosEventBookmarkPost } from "../../network/axios/axios.event";

const ButtonStyle = {
  fontSize: "0.5rem",
  height: "1.5rem",
  width: "4rem",
  color: "#3d75cc",
};

interface DetailBookmarkNavProps {
  eventId: number;
}

const DetailBookmarkNav = (props: DetailBookmarkNavProps): JSX.Element => {
  const { eventId } = props;
  return (
    <>
      <PageNavigateButton
        style={ButtonStyle}
        value="상세보기"
        route={`/detail/${eventId}`}
      />
      <BookmarkApiButton
        style={ButtonStyle}
        iconDisplay={false}
        param={eventId}
        value="북마크 추가"
        api={axiosEventBookmarkPost}
      />
    </>
  );
};

export default DetailBookmarkNav;
