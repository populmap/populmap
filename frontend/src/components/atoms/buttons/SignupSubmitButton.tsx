import Button from "@mui/material/Button";
import { axiosAuthRegister } from "../../../network/axios/axios.auth";

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
    axiosAuthRegister({ userEmail, userId, userPassword }).catch((error) =>
      console.error(error)
    );
  };

  return (
    <Button onClick={handleClick} style={{ width: "60%" }} variant="contained">
      {value}
    </Button>
  );
};

export default SignupSubmitButton;
