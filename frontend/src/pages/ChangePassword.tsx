import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import ChangePasswordTemplate from "../components/templates/ChangePasswordTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Changepassword = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <ChangePasswordTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Changepassword;
