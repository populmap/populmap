import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosAuthRegister } from "../../../network/axios/axios.auth";

interface SignupSubmitButtonProps {
  email: string;
  userName: string;
  password: string;
  value: string;
}

const SignupSubmitButton = (props: SignupSubmitButtonProps): JSX.Element => {
  const { email, userName, password, value } = props;
  const [isSignupFail, setIsSignupFail] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (): void => {
    axiosAuthRegister({ email, userName, password })
      .then((response) => {
        if (response.status === 201) {
          alert("회원가입에 성공했습니다.");
          navigate("/");
        }
      })
      .catch((error) => setIsSignupFail(true));
  };

  return (
    <>
      {isSignupFail && (
        <p style={{ fontSize: "0.7rem", color: "red" }}>
          {" "}
          이미 가입된 이메일 혹은 아이디입니다.{" "}
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

export default SignupSubmitButton;
