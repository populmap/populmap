import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import FindPasswordTemplate from "../components/templates/FindPasswordTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const FindPassword = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <FindPasswordTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default FindPassword;
