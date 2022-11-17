import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Event = (): JSX.Element => {
  return (
    <>
      <HeaderTemplate />
      <ContentTemplate>
        <NavTemplate />
        <FooterTemplate />
      </ContentTemplate>
    </>
  );
};

export default Event;
