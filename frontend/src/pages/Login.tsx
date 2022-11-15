import LoginTemplate from "../components/templates/LoginTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Login = (): JSX.Element => {
  return (
    <>
      <ContentTemplate>
        <LoginTemplate />
      </ContentTemplate>
      <FooterTemplate />
    </>
  );
};

export default Login;
