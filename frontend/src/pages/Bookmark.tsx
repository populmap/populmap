import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import ListTemplate from "../components/templates/ListTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Bookmark = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <ListTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Bookmark;
