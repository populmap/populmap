import styled from "@emotion/styled";
import ContentTemplate from "../components/templates/ContentTemplate";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import SearchTemplate from "../components/templates/SearchTemplate";
import MainTemplate from "../components/templates/MainTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Main = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <SearchTemplate />
      <MainTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Main;
