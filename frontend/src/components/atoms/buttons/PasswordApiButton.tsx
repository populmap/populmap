import Button from "@mui/material/Button";

interface PasswordApiButtonProps {
  api: (body: object) => Promise<any>;
  newPassword: string;
  value: string;
  style?: object;
}

const PasswordApiButton = (props: PasswordApiButtonProps): JSX.Element => {
  const { api, newPassword, value, style } = props;
  const handleClick = (): void => {
    if (newPassword !== "") {
      api({ newPassword }).catch((error: any) => {
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
