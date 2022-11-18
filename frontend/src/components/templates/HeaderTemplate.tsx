import styled from "@emotion/styled";

const Header = styled.header`
  position: absolute;
  top: 2%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0%);
`;

const HeaderTemplate = (): JSX.Element => {
  return (
    <Header>
      <span>populmap</span>
    </Header>
  );
};

export default HeaderTemplate;
