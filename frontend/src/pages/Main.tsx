import MainTemplate from "../components/templates/MainTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Main = (): JSX.Element => {
  return (
    <>
      <ContentTemplate>
        <MainTemplate />
        <NavTemplate />
      </ContentTemplate>
      <FooterTemplate />
    </>
  );
};

export default Main;
