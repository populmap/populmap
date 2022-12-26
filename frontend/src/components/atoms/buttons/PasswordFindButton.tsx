import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { axiosAuthPasswordFind } from "../../../network/axios/axios.auth";

interface PasswordFindButtonProps {
  body: string;
  value: string;
  style?: object;
}

const PasswordFindButton = (props: PasswordFindButtonProps): JSX.Element => {
  const { body, value, style } = props;
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (body !== "") {
      axiosAuthPasswordFind({ id: body })
        .then((response) => {
          if (response.status === 204) {
            alert("아이디(이메일)로 임시 비밀번호가 발급되었습니다.");
            navigate("/login");
          }
        })
        .catch((error: any) => {
          console.error(error);
          alert("🚨 요청에 실패했습니다 🚨");
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
