import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BaseButton from "../atoms/buttons/BaseButton";

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  height: 1.5rem;
  padding-top: 0.5rem;
`;

const LoginNav = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <NavStyle>
      <BaseButton
        theme={"navigate"}
        value="회원가입"
        handleClick={() => navigate("/signup")}
      />
      <BaseButton
        theme={"navigate"}
        value="비밀번호 찾기"
        handleClick={() => navigate("/findpassword")}
      />
    </NavStyle>
  );
};

export default LoginNav;
