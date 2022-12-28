import styled from "@emotion/styled";
import { SetStateAction, Dispatch } from "react";

interface SelectInstanceProps {
  style?: object;
  options: Array<string>;
  setValue: Dispatch<SetStateAction<string>>;
  type: string;
}

const SelectInstance = (props: SelectInstanceProps): JSX.Element => {
  const { style, options, setValue, type } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value);
  };

  return (
    <>
      <select style={style} onChange={handleChange}>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </>
  );
};

SelectInstance.defaultProps = {
  style: {
    fontSize: "0.6rem",
    width: "7rem",
    height: "1.5rem",
    border: "0.05rem solid gray",
    borderRadius: "0.7rem",
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
  },
};

export default SelectInstance;
