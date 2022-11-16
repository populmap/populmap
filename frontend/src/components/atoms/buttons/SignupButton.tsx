import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Button = styled.button`
  border: 0;
  background-color: transparent;
`;
const SignupButton = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate("/signup");
  };

  return <Button onClick={handleClick}>회원가입</Button>;
};

export default SignupButton;
