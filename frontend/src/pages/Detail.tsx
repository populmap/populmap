import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import DetailTemplate from "../components/templates/DetailTemplate";
import NavTemplate from "../components/templates/NavTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";

const Detail = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <DetailTemplate />
      <NavTemplate />
      <FooterTemplate />
    </ContentTemplate>
  );
};

export default Detail;
