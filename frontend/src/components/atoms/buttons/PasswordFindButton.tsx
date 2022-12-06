import Button from "@mui/material/Button";
import { axiosAuthPasswordFind } from "../../../network/axios/axios.auth";

interface PasswordFindButtonProps {
  body: string;
  value: string;
  style?: object;
}

const PasswordFindButton = (props: PasswordFindButtonProps): JSX.Element => {
  const { body, value, style } = props;
  const handleClick = (): void => {
    if (body !== "") {
      axiosAuthPasswordFind({ body })
        .then((response) => console.log(response))
        .catch((error: any) => {
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

PasswordFindButton.defaultProps = {
  style: {
    backgroundColor: "#1976d2",
    width: "60%",
  },
};

export default PasswordFindButton;
