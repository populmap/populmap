import styled from "@emotion/styled";
import { useState } from "react";
import LoginSubmitButton from "../atoms/buttons/LoginSumbitButton";
import InputInstance from "../atoms/inputs/InputInstance";
import PasswordInput from "../atoms/inputs/PasswordInput";

const FormStyle = styled.form`
  text-align: center;
`;

const LoginForm = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <FormStyle>
      <h1>로그인</h1>
      <InputInstance
        title="아이디(이메일)"
        placeholder="아이디를 입력하세요"
        setValue={setId}
      />
      <PasswordInput
        title="비밀번호"
        placeholder="비밀번호를 입력하세요"
        setValue={setPassword}
      />
      <LoginSubmitButton id={id} password={password} value="로그인" />
    </FormStyle>
  );
};

export default LoginForm;
