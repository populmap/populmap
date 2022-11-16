import LoginTemplate from "../components/templates/LoginTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";

const Login = (): JSX.Element => {
  return (
    <ContentTemplate>
      <LoginTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Login;
