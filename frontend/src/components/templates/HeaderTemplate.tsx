import styled from "@emotion/styled";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import HeaderMenu from "../organisms/HeaderMenu";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  position: absolute;
  top: 0%;
  left: 50%;
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, 0%);
  justify-content: space-between;
  background-color: white;
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
