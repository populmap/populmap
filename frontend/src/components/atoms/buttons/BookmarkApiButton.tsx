import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppSelector } from "../../../redux/hook";

interface BookmarkApiButtonProps {
  api: (eventId: number) => Promise<any>;
  value: string;
  param: number;
  style?: object;
  iconDisplay?: boolean;
}

const BookmarkApiButton = (props: BookmarkApiButtonProps): JSX.Element => {
  const { param, api, value, style, iconDisplay } = props;
  const user = useAppSelector((state) => state.user);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (user.userId === -1) alert("로그인이 필요한 서비스입니다.");
    else {
      api(param)
        .then((response) => {
          if (response.status === 201) alert("북마크에 추가되었습니다.");
          else if (response.status === 204) alert("북마크에서 제거되었습니다.");
        })
        .catch((error: any) => {
          alert(error.response.data.message);
          console.error(error);
        });
    }
  };
  return (
    <IconButton style={style} onClick={handleClick}>
      {iconDisplay && <BookmarkIcon />}
      {value}
    </IconButton>
  );
};

BookmarkApiButton.defaultProps = {
  style: {
    flexDirection: "column",
    fontSize: "0.5rem",
    height: "1.5rem",
    width: "5rem",
    color: "black",
  },
  iconDisplay: true,
};

export default BookmarkApiButton;
