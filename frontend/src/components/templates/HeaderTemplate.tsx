import styled from "@emotion/styled";

const Header = styled.header`
  height: 5vh;
  width: 100vw;
  max-width: 30rem;
  max-height: 60rem;
  text-align: center;
`;

const HeaderTemplate = (): JSX.Element => {
  return (
    <Header>
      <span>populmap</span>
    </Header>
  );
};

export default HeaderTemplate;
