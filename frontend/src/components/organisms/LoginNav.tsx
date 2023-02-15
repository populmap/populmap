import styled from "@emotion/styled";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  height: 1.5rem;
  padding-top: 0.5rem;
`;

const LoginNav = (): JSX.Element => {
  return (
    <NavStyle>
      <PageNavigateButton value="회원가입" route="/signup" />
      <PageNavigateButton value="비밀번호 찾기" route="/findpassword" />
    </NavStyle>
  );
};

export default LoginNav;
