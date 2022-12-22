import styled from "@emotion/styled";
import SearchBar from "../organisms/SearchBar";

const BarSection = styled.section`
  position: absolute;
  top: 5%;
  left: 50%;
  width: 100%;
  height: 5%;
  transform: translate(-50%, 0%);
  touch-action: none;
`;

const SearchTemplate = (): JSX.Element => {
  return (
    <BarSection>
      <SearchBar />
    </BarSection>
  );
};

export default SearchTemplate;
