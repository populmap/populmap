import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Main = (): JSX.Element => {
  return (
    <>
      <HeaderTemplate />
      <ContentTemplate>
        <MainTemplate />
        <NavTemplate />
        <FooterTemplate />
      </ContentTemplate>
    </>
  );
};

export default Main;
