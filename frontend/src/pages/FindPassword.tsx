import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import FindPasswordTemplate from "../components/templates/FindPasswordTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const FindPassword = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <FindPasswordTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default FindPassword;
