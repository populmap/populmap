import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import LoginTemplate from "../components/templates/LoginTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Login = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <LoginTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Login;
