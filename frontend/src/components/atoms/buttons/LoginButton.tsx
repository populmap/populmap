import Button from "@mui/material/Button";

interface LoginButtonProps {
  userId: string;
  userPasswd: string;
}
const LoginButton = (props: LoginButtonProps): JSX.Element => {
  const { userId, userPasswd } = props;
  const handleClick = (): void => {
    console.log("clicked");
  };
  return (
    <Button onClick={handleClick} style={{ width: "60%" }} variant="contained">
      로그인
    </Button>
  );
};

export default LoginButton;
