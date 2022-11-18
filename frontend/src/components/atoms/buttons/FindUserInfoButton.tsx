import Button from "@mui/material/Button";

const ButtonStyle = {
  border: 0,
  color: "black",
  backgroundColor: "transparent",
};

interface FindUserInfoButtonProps {
  type: string;
  value: string;
}

// TODO: 계정 찾기와 비밀번호 찾기의 경우 각각 modal을 띄워줘야합니다.
const FindUserInfoButton = (props: FindUserInfoButtonProps): JSX.Element => {
  const { type, value } = props;
  return type === "id" ? (
    <Button style={ButtonStyle}>{value}</Button>
  ) : (
    <Button style={ButtonStyle}>{value}</Button>
  );
};

export default FindUserInfoButton;
