import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import DetailTemplate from "../components/templates/DetailTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Detail = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <DetailTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Detail;
