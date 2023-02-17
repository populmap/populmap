import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputInstance from "../atoms/inputs/InputInstance";
import PasswordInput from "../atoms/inputs/PasswordInput";
import BaseButton from "../atoms/buttons/BaseButton";
import { axiosAuthRegister } from "../../network/axios/axios.auth";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const SignupForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = () => {
    axiosAuthRegister({ email, userName, password })
      .then((response) => {
        if (response.status === 201) {
          alert("회원가입에 성공했습니다.");
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <FormStyle>
      <DivStyle>
        <h1>회원가입</h1>
        <InputInstance
          title="이메일"
          placeholder="이메일을 입력하세요"
          setValue={setEmail}
        />
        <InputInstance
          title="아이디"
          placeholder="아이디를 입력하세요"
          setValue={setUserName}
        />
        <PasswordInput
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          setValue={setPassword}
        />
      </DivStyle>
      <BaseButton
        theme={"api"}
        color={"secondary"}
        variant={"contained"}
        value={"가입하기"}
        handleClick={handleClick}
      />
    </FormStyle>
  );
};

export default SignupForm;
