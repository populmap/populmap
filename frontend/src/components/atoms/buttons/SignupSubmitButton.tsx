import Button from "@mui/material/Button";
import { axiosAuthRegister } from "../../../network/axios/axios.auth";

interface SignupSubmitButtonProps {
  email: string;
  userName: string;
  password: string;
  value: string;
}

// TODO: handleClick을 통해 register API 요청
const SignupSubmitButton = (props: SignupSubmitButtonProps): JSX.Element => {
  const { email, userName, password, value } = props;
  const handleClick = (): void => {
    axiosAuthRegister({ email, userName, password }).catch((error) =>
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
