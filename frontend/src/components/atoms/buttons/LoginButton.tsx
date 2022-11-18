import Button from "@mui/material/Button";

interface LoginButtonProps {
  userId: string;
  userPassword: string;
  value: string;
}

// TODO: handleClick을 통해 login API 요청
const LoginButton = (props: LoginButtonProps): JSX.Element => {
  const { userId, userPassword, value } = props;
  const handleClick = (): void => {
    console.log(userId, userPassword);
    console.log("clicked");
  };
  return (
    <Button onClick={handleClick} style={{ width: "60%" }} variant="contained">
      {value}
    </Button>
  );
};

export default LoginButton;
