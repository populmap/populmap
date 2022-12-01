import Button from "@mui/material/Button";

interface PasswordApiButtonProps {
  api: (body: object) => Promise<any>;
  body: string;
  value: string;
  style?: object;
}

const PasswordApiButton = (props: PasswordApiButtonProps): JSX.Element => {
  const { api, body, value, style } = props;
  const handleClick = (): void => {
    if (body !== "") {
      api({ body }).catch((error: any) => {
        console.error(error);
      });
    }
  };

  return (
    <Button style={style} onClick={handleClick}>
      {value}
    </Button>
  );
};

PasswordApiButton.defaultProps = {
  style: {
    backgroundColor: "#1976d2",
    width: "60%",
  },
};

export default PasswordApiButton;
