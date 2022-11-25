import styled from "@emotion/styled";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";

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
`;

const HeaderTemplate = (): JSX.Element => {
  return (
    <Header>
      <PageNavigateButton text="My" route="/my" />
      <PageNavigateButton text="populmap" route="/" />
      <PageNavigateButton text="Login" route="/login" />
    </Header>
  );
};

export default HeaderTemplate;
