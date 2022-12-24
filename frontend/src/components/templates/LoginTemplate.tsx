import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";
import LoginNav from "../organisms/LoginNav";
import OauthLoginNav from "../organisms/OauthLoginNav";

const LoginSection = styled.section`
  position: absolute;
  text-align: center;
  top: 5%;
  width: 100%;
  height: 95%;
`;

const LoginTemplate = (): JSX.Element => {
  return (
    <LoginSection>
      <LoginForm />
      <LoginNav />
      <hr style={{ width: "60%" }} />
      <OauthLoginNav />
    </LoginSection>
  );
};

export default LoginTemplate;
