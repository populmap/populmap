import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";

const TitleSection = styled.header``;
const LoginSection = styled.section``;
const NavSection = styled.nav``;

const LoginTemplate = (): JSX.Element => {
  return (
    <>
      <TitleSection>
        <h1>populmap</h1>
      </TitleSection>
      <LoginSection>
        <LoginForm />
      </LoginSection>
      <NavSection>
        <h1> Login Nav </h1>
      </NavSection>
    </>
  );
};

export default LoginTemplate;
