import React, { SetStateAction, Dispatch } from "react";

interface PasswordInputProps {
  title?: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const PasswordInputStyle = {
  border: 0,
  borderBottom: "0.06rem solid black",
  backgroundColor: "transparent",
  width: "60%",
  fontFamily: "none",
};

const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const { title, placeholder, setValue } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div>
      {title ? <h5>{title}</h5> : null}
      <input
        type="password"
        style={PasswordInputStyle}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

PasswordInput.defaultProps = {
  title: null,
};

export default PasswordInput;
