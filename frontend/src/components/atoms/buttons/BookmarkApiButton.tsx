import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { reloadComponent } from "../../../redux/slices/reloadSlice";

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
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (user.userId === -1) alert("로그인이 필요한 서비스입니다.");
    else {
      api(param)
        .then((response) => {
          if (response.status === 201) alert("북마크에 추가되었습니다.");
          else if (response.status === 204) alert("북마크에서 제거되었습니다.");
          dispatch(reloadComponent());
        })
        .catch((error: any) => {
          alert(error.response.data.message);
          console.error(error);
        });
    }
  };
  return (
    <IconButton style={style} onClick={handleClick}>
      {iconDisplay && <BookmarkBorderIcon style={{ color: "#1b73e8" }} />}
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
