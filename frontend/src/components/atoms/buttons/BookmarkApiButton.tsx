import BaseButton from "./BaseButton";
import {
  axiosEventBookmarkPost,
  axiosEventBookmarkDelete,
} from "../../../network/axios/axios.event";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { reloadComponent } from "../../../redux/slices/reloadSlice";

interface BookmarkApiButtonProps {
  isBookmarked?: boolean;
  theme?: string;
  icon?: JSX.Element;
  color?: "primary" | "secondary";
  variant?: "text" | "outlined" | "contained";
  value?: string;
  eventId: number;
}

const BookmarkApiButton = (props: BookmarkApiButtonProps): JSX.Element => {
  const { isBookmarked, icon, theme, color, variant, value, eventId } = props;
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (user.userId === -1) alert("로그인이 필요한 서비스입니다.");
    else {
      isBookmarked
        ? axiosEventBookmarkDelete(eventId)
            .then((response) => {
              if (response.status === 204) alert("북마크에서 제거되었습니다.");
              dispatch(reloadComponent());
            })
            .catch((error: any) => {
              alert(error.response.data.message);
              console.error(error);
            })
        : axiosEventBookmarkPost(eventId)
            .then((response) => {
              if (response.status === 201) alert("북마크에 추가되었습니다.");
              dispatch(reloadComponent());
            })
            .catch((error: any) => {
              alert(error.response.data.message);
              console.error(error);
            });
    }
  };
  return (
    <BaseButton
      theme={theme}
      icon={icon}
      color={color}
      variant={variant}
      value={value}
      handleClick={handleClick}
    />
  );
};

export default BookmarkApiButton;
