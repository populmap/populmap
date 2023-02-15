import { SetStateAction, Dispatch } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { mapSearch } from "../../../redux/slices/mapSlice";

interface SearchInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const { value, setValue } = props;
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") {
      dispatch(mapSearch(value));
      setValue("");
    }
  };

  return (
    <input
      style={{ border: 0, backgroundColor: "#fafafa" }}
      value={value}
      type="text"
      placeholder="장소를 입력해주세요"
      onChange={handleChange}
      onKeyUp={onKeyUp}
      maxLength={100}
    />
  );
};

export default SearchInput;
