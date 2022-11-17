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
      <SignupButton />
      <FindUserInfoButton type="id" />
      <FindUserInfoButton type="password" />
    </NavSection>
  );
};

export default LoginNav;
