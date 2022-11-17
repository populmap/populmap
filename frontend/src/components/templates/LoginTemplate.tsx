import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";
import LoginNav from "../organisms/LoginNav";

const LoginSection = styled.section`
  text-align: center;
  width: 100%;
  background-color: #fafafa;
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
