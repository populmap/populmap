import { SetStateAction, Dispatch } from "react";

interface InputInstanceProps {
  title: string | null;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const InputInstanceStyle = {
  border: 0,
  borderBottom: "0.06rem solid black",
  backgroundColor: "transparent",
};

const InputInstance = (props: InputInstanceProps): JSX.Element => {
  const { title, placeholder, setValue } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div>
      {title ? <h5>{title}</h5> : null}
      <input
        style={InputInstanceStyle}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputInstance;