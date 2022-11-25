import styled from "@emotion/styled";
import SearchInput from "../atoms/inputs/SearchInput";

const BarSection = styled.section`
  position: absolute;
  top: 5%;
  left: 50%;
  width: 100%;
  height: 5%;
  transform: translate(-50%, 0%);
`;

const SearchTemplate = (): JSX.Element => {
  return (
    <BarSection>
      <SearchInput />
    </BarSection>
  );
};

export default SearchTemplate;
