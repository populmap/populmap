import Button from "@mui/material/Button";

interface BookmarkApiButtonProps {
  api: (eventId: number) => Promise<any>;
  value: string;
  param: number;
  style?: object;
}

const BookmarkApiButton = (props: BookmarkApiButtonProps): JSX.Element => {
  const { param, api, value, style } = props;
  const handleClick = (): void => {
    api(param).catch((error: any) => {
      console.error(error);
      alert("🚨 요청에 실패했습니다 🚨");
    });
  };
  return (
    <Button style={style} onClick={handleClick}>
      {value}
    </Button>
  );
};

BookmarkApiButton.defaultProps = {
  style: {},
};

export default BookmarkApiButton;
