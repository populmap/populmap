import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import ListTemplate from "../components/templates/ListTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Bookmark = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <ListTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Bookmark;
