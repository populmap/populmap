import styled from "@emotion/styled";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import HeaderMenu from "../organisms/HeaderMenu";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  touch-action: none;
`;

const HeaderTemplate = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Header>
      <img
        width="40px"
        height="40px"
        src="../../../img/homeLogo.ico"
        onClick={() => navigate("/")}
        alt="homeLogo"
      />
      <PageNavigateButton
        style={{
          fontSize: "1rem",
          height: "1.5rem",
          width: "5rem",
          color: "black",
          marginTop: "0.5rem",
        }}
        value="populmap"
        route="/"
      />
      <HeaderMenu />
    </Header>
  );
};

export default HeaderTemplate;
