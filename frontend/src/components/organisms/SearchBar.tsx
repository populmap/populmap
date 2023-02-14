import { useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchInput from "../atoms/inputs/SearchInput";

const SearchBarDivStyle = styled.div`
  display: flex;
  justify-content: center;
  height: 90%;
  width: 60%;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 0.7rem;
`;

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  return (
    <SearchBarDivStyle>
      <SearchInput value={value} setValue={setValue} />
      <IconButton onClick={() => setValue("")}>
        <ClearIcon />
      </IconButton>
    </SearchBarDivStyle>
  );
};

export default SearchBar;
