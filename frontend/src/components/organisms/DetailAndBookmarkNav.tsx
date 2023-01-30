import { useState } from "react";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import {
  axiosEventBookmarkPost,
  axiosEventBookmarkDelete,
} from "../../network/axios/axios.event";

const ButtonStyle = {
  fontSize: "0.5rem",
  height: "1.5rem",
  width: "4rem",
  color: "#3d75cc",
};

interface DetailAndBookmarkNavProps {
  eventId: number;
  isBookmarked: boolean;
}

const DetailAndBookmarkNav = (
  props: DetailAndBookmarkNavProps
): JSX.Element => {
  const { eventId, isBookmarked } = props;
  return (
    <>
      <PageNavigateButton
        style={ButtonStyle}
        value="상세보기"
        route={`/detail/${eventId}`}
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
    </>
  );
};

export default DetailAndBookmarkNav;
