import ContentTemplate from "../components/templates/ContentTemplate";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import SearchTemplate from "../components/templates/SearchTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Main = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SearchTemplate />
      <MainTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Main;
