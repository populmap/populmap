import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { axiosAuthPasswordChange } from "../../../network/axios/axios.auth";

interface PasswordChangeButtonProps {
  newPassword: string;
  value: string;
  style?: object;
}

const PasswordChangeButton = (
  props: PasswordChangeButtonProps
): JSX.Element => {
  const { newPassword, value, style } = props;
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (newPassword !== "") {
      axiosAuthPasswordChange({ newPassword })
        .then((response) => {
          if (response.status === 204) {
            alert("비밀번호가 변경되었습니다.");
            navigate("/");
          }
        })
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

PasswordChangeButton.defaultProps = {
  style: {
    backgroundColor: "#1976d2",
    width: "60%",
  },
};

export default PasswordChangeButton;
