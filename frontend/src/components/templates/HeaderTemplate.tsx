import styled from "@emotion/styled";
import BaseButton from "../atoms/buttons/BaseButton";
import HeaderMenu from "../organisms/HeaderMenu";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  touch-action: none;

  button {
    width: 5rem;
  }
`;

const HeaderTemplate = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Header>
      <BaseButton
        value={
          <img
            width="40px"
            height="40px"
            src="../../../img/homeLogo.ico"
            alt="homeLogo"
          />
        }
        handleClick={() => navigate("/")}
      />
      <BaseButton value="populmap" handleClick={() => navigate("/")} />
      <HeaderMenu />
    </Header>
  );
};

export default HeaderTemplate;
