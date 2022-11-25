import { SetStateAction, Dispatch } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

interface InputDeleteButtonProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const InputDeleteButton = (props: InputDeleteButtonProps): JSX.Element => {
  const { setValue } = props;
  const handleClick = (): void => {
    setValue("");
  };
  return (
    <IconButton onClick={handleClick}>
      <ClearIcon />
    </IconButton>
  );
};

export default InputDeleteButton;
