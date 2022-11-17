import Button from "@mui/material/Button";

interface SignupSubmitButtonProps {
  userEmail: string;
  userId: string;
  userPassword: string;
  value: string;
}

// TODO: handleClick을 통해 register API 요청
const SignupSubmitButton = (props: SignupSubmitButtonProps): JSX.Element => {
  const { userEmail, userId, userPassword, value } = props;
  const handleClick = (): void => {
    console.log(userEmail, userId, userPassword);
    console.log("clicked");
  };
  return (
    <Button onClick={handleClick} style={{ width: "60%" }} variant="contained">
      {value}
    </Button>
  );
};

export default SignupSubmitButton;
