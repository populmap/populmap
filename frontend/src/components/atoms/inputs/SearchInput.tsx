import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { mapSearch } from "../../../redux/slices/mapSlice";

const SearchInput = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") dispatch(mapSearch(value));
  };

  return (
    <input
      placeholder="장소를 입력해주세요"
      onChange={handleChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default SearchInput;
