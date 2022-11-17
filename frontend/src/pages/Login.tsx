import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import LoginTemplate from "../components/templates/LoginTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Login = (): JSX.Element => {
  return (
    <>
      <HeaderTemplate />
      <ContentTemplate>
        <LoginTemplate />
        <NavTemplate />
        <FooterTemplate />
      </ContentTemplate>
    </>
  );
};

export default Login;
