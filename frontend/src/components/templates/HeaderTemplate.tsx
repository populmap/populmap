import styled from "@emotion/styled";
import BaseButton from "../atoms/buttons/BaseButton";
import HeaderMenu from "../organisms/HeaderMenu";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: space-between;
  touch-action: none;
  button {
    padding-top: 0.7rem;
  }
`;

const HeaderTemplate = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Header>
      <BaseButton
        theme={"icon"}
        icon={<img src="../../../img/homeLogo.ico" alt="homeLogo" />}
        handleClick={() => navigate("/")}
      />
      <BaseButton
        theme={"navigate"}
        value={"populmap"}
        handleClick={() => navigate("/")}
      />
      <HeaderMenu />
    </Header>
  );
};

export default HeaderTemplate;
