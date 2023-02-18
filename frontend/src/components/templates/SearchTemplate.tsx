import styled from "@emotion/styled";
import SearchBar from "../organisms/SearchBar";

const SearchSectionStyle = styled.section`
  height: 5vh;
  touch-action: none;
`;

const SearchTemplate = (): JSX.Element => {
  return (
    <SearchSectionStyle>
      <SearchBar />
    </SearchSectionStyle>
  );
};

export default SearchTemplate;
