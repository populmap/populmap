interface LoginInputProps {
  placeholder: string;
}

const LoginInput = (props: LoginInputProps): JSX.Element => {
  const { placeholder } = props;
  return (
    <div>
      <input
        style={{ border: 0, borderBottom: "0.06rem solid black" }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginInput;
