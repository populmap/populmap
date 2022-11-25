import { useState } from "react";
import styled from "@emotion/styled";
import SearchInput from "../atoms/inputs/SearchInput";
import InputDeleteButton from "../atoms/buttons/InputDeleteButton";

const SearchBarDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const InputDiv = styled.div`
  width: 70%;
  height: 80%;
  background-color: #fafafa;
  border-radius: 0.3rem;
`;

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  return (
    <SearchBarDiv>
      <InputDiv>
        <SearchInput value={value} setValue={setValue} />
        {value === "" ? null : <InputDeleteButton setValue={setValue} />}
      </InputDiv>
    </SearchBarDiv>
  );
};

export default SearchBar;
