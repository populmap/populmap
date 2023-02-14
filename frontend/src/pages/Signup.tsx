import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import SignupTemplate from "../components/templates/SignupTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Signup = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SignupTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Signup;
