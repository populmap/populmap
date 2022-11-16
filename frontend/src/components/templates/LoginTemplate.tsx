import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";
import LoginNav from "../organisms/LoginNav";

const LoginSection = styled.section`
  height: 90vh;
  text-align: center;
`;

const LoginTemplate = (): JSX.Element => {
  return (
    <LoginSection>
      <LoginForm />
      <LoginNav />
    </LoginSection>
  );
};

export default LoginTemplate;
