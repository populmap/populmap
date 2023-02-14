import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import ChangePasswordTemplate from "../components/templates/ChangePasswordTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const ChangePassword = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <ChangePasswordTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default ChangePassword;
