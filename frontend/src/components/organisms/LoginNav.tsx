import styled from "@emotion/styled";
import SignupButton from "../atoms/buttons/SignupButton";
import FindUserInfoButton from "../atoms/buttons/FindUserInfoButton";

const NavSection = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginNav = (): JSX.Element => {
  return (
    <NavSection>
      <SignupButton value="회원가입" />
      <FindUserInfoButton type="id" value="계정 찾기" />
      <FindUserInfoButton type="password" value="비밀번호 찾기" />
    </NavSection>
  );
};

export default LoginNav;
