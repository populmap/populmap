import styled from "@emotion/styled";
import MarkedMap from "../organisms/MarkedMap";

const MainSection = styled.section`
  position: relative;
  height: 95vh;
  width: 100vw;
`;

const MainTemplate = (): JSX.Element => {
  return (
    // <MainSection>
    <MarkedMap />
    // </MainSection>
  );
};

export default MainTemplate;
