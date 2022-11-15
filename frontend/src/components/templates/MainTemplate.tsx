import styled from "@emotion/styled";
import InitMap from "../map/InitMap";
import ContentTemplate from "./ContentTemplate";
import NavTemplate from "./NavTemplate";

const MainTemplate = () => {
  return (
    <ContentTemplate>
      {/* <InitMap /> */}
      <NavTemplate />
    </ContentTemplate>
  );
};

export default MainTemplate;
