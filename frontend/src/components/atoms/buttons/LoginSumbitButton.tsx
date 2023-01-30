import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAuthLogin } from "../../../network/axios/axios.auth";

interface LoginSumbitButtonProps {
  id: string;
  password: string;
  value: string;
}

const LoginSumbitButton = (props: LoginSumbitButtonProps): JSX.Element => {
  const { id, password, value } = props;
  const [isLoginFail, setIsLoginFail] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = (): void => {
    axiosAuthLogin({ id, password })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else if (response.status === 202) navigate("/changepassword");
      })
      .catch((error) => {
        setIsLoginFail(true);
        console.error(error);
      });
  };

  return (
    <>
      {isLoginFail && (
        <p style={{ fontSize: "0.7rem", color: "red" }}>
          {" "}
          아이디(이메일) 또는 비밀번호를 잘못 입력했습니다.{" "}
        </p>
      )}
      <Button
        onClick={handleClick}
        style={{ width: "60%" }}
        variant="contained"
      >
        {value}
      </Button>
    </>
  );
};

export default LoginSumbitButton;
