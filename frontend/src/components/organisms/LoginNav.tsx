import styled from "@emotion/styled";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";

const NavSection = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginNav = (): JSX.Element => {
  return (
    <NavSection>
      <PageNavigateButton value="회원가입" route="/signup" />
      <PageNavigateButton value="비밀번호 찾기" route="/findpassword" />
    </NavSection>
  );
};

export default LoginNav;
