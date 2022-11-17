interface LoginInputProps {
  title: string | null;
  placeholder: string;
}

const InputStyle = {
  border: 0,
  borderBottom: "0.06rem solid black",
  backgroundColor: "transparent",
};

const LoginInput = (props: LoginInputProps): JSX.Element => {
  const { title, placeholder } = props;
  return (
    <div>
      {title ? <h5>{title}</h5> : null}
      <input style={InputStyle} placeholder={placeholder} />
    </div>
  );
};

export default LoginInput;
