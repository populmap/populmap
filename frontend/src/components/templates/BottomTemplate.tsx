import styled from "@emotion/styled";
import BottomNav from "../organisms/BottomNav";
import Footer from "../organisms/Footer";

const NavFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100px;
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translate(-50%, 0);
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
