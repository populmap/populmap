import styled from "@emotion/styled";
import LoginForm from "../organisms/LoginForm";
import LoginNav from "../organisms/LoginNav";
import OauthLoginNav from "../organisms/OauthLoginNav";

const LoginSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;

const LoginTemplate = (): JSX.Element => {
  return (
    <LoginSectionStyle>
      <LoginForm />
      <LoginNav />
      <hr style={{ width: "60%" }} />
      <OauthLoginNav />
    </LoginSectionStyle>
  );
};

export default LoginTemplate;
