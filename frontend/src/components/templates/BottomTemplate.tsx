import styled from "@emotion/styled";
import BottomNav from "../organisms/BottomNav";
import Footer from "../organisms/Footer";

const NavFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  bottom: 5%;
  height: 100px;
`;

const BottomTemplate = (): JSX.Element => {
  return (
    <NavFooterWrapper>
      <BottomNav />
      <Footer />
    </NavFooterWrapper>
  );
};

export default BottomTemplate;
