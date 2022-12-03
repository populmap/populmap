import styled from "@emotion/styled";
import { useState } from "react";
import LoginSubmitButton from "../atoms/buttons/LoginSumbitButton";
import InputInstance from "../atoms/inputs/InputInstance";

const Form = styled.form`
  margin-top: 6rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.section`
  margin: 1rem 0;
`;

const LoginForm = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Form>
      <h1>로그인</h1>
      <InputSection>
        <InputInstance
          title="아이디(이메일)"
          placeholder="아이디를 입력하세요"
          setValue={setId}
        />
        <InputInstance
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          setValue={setPassword}
        />
      </InputSection>
      <LoginSubmitButton id={id} password={password} value="로그인" />
    </Form>
  );
};

export default LoginForm;
