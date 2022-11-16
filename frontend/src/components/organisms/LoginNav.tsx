import styled from "@emotion/styled";
import SignupButton from "../atoms/buttons/SignupButton";
import FindUserInfoButton from "../atoms/buttons/FindUserInfoButton";

const NavSection = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const LoginNav = (): JSX.Element => {
  return (
    <NavSection>
      <SignupButton />
      <FindUserInfoButton type="id" />
      <FindUserInfoButton type="passwd" />
    </NavSection>
  );
};

export default LoginNav;
