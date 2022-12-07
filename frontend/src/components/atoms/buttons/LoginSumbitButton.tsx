import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../../../redux/hook";
import { userInfoUpdate } from "../../../redux/slices/userSlice";
import { getCookie } from "../../../network/react-cookie/cookie";
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
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    axiosAuthLogin({ id, password })
      .then((response) => {
        if (response.status === 200) {
          const token = getCookie("populmap_token");
          dispatch(userInfoUpdate(jwtDecode(token)));
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
