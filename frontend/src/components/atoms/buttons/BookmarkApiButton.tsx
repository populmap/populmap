import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface BookmarkApiButtonProps {
  api: (eventId: number) => Promise<any>;
  value: string;
  param: number;
  style?: object;
  iconDisplay?: boolean;
}

const BookmarkApiButton = (props: BookmarkApiButtonProps): JSX.Element => {
  const { param, api, value, style, iconDisplay } = props;
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    api(param).catch((error: any) => {
      console.error(error);
      alert("🚨 요청에 실패했습니다 🚨");
    });
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
