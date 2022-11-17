import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";
import LoginNav from "../organisms/LoginNav";
import OauthLoginNav from "../organisms/OauthLoginNav";

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
      <OauthLoginNav />
    </LoginSection>
  );
};

export default LoginTemplate;
