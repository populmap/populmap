import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const ButtonStyle = {
  border: 0,
  color: "black",
  backgroundColor: "transparent",
};

interface SignupButtonProps {
  value: string;
}
const SignupButton = (props: SignupButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const { value } = props;
  const handleClick = (): void => {
    navigate("/signup");
  };

  return (
    <Button style={ButtonStyle} onClick={handleClick}>
      {value}
    </Button>
  );
};

export default SignupButton;
