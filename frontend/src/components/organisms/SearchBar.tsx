import { useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SearchInput from "../atoms/inputs/SearchInput";
import { useAppDispatch } from "../../redux/hook";
import { mapSearch } from "../../redux/slices/mapSlice";
import colorTypes from "../../types/colorTypes";

const SearchBarDivStyle = styled.div`
  display: flex;
  justify-content: left;
  height: 90%;
  width: 60%;
  margin: 0 auto;
  background-color: ${colorTypes.gray};
  border-radius: 0.7rem;
`;

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(mapSearch(value));
    setValue("");
  };

  return (
    <SearchBarDivStyle>
      <IconButton onClick={handleClick}>
        <SearchIcon />
      </IconButton>
      <SearchInput value={value} setValue={setValue} />
      {value !== "" && (
        <IconButton onClick={handleClick}>
          <ClearIcon />
        </IconButton>
      )}
    </SearchBarDivStyle>
  );
};

export default SearchBar;
