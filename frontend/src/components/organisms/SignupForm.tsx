import styled from "@emotion/styled";
import { useState } from "react";
import SignupSubmitButton from "../atoms/buttons/SignupSubmitButton";
import InputInstance from "../atoms/inputs/InputInstance";
import PasswordInput from "../atoms/inputs/PasswordInput";

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
      <SignupSubmitButton
        email={email}
        userName={userName}
        password={password}
        value="가입하기"
      />
    </FormStyle>
  );
};

export default SignupForm;
