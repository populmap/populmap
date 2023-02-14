import styled from "@emotion/styled";
import HeaderTemplate from "../components/templates/HeaderTemplate";
import ContentTemplate from "../components/templates/ContentTemplate";
import ListTemplate from "../components/templates/ListTemplate";
import BottomTemplate from "../components/templates/BottomTemplate";

const Event = (): JSX.Element => {
  return (
    <ContentTemplate>
      <HeaderTemplate />
      <ListTemplate />
      <BottomTemplate />
    </ContentTemplate>
  );
};

export default Event;
