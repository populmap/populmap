import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import SignupTemplate from "../components/templates/SignupTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Signup = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SignupTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Signup;
