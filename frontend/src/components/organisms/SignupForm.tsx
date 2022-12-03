import styled from "@emotion/styled";
import { useState } from "react";
import SignupSubmitButton from "../atoms/buttons/SignupSubmitButton";
import InputInstance from "../atoms/inputs/InputInstance";

const Form = styled.form`
  margin-top: 6rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.section`
  margin: 1rem 0;
`;

const SignupForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Form>
      <h1>회원가입</h1>
      <InputSection>
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
        <InputInstance
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          setValue={setPassword}
        />
      </InputSection>
      <SignupSubmitButton
        email={email}
        userName={userName}
        password={password}
        value="가입하기"
      />
    </Form>
  );
};

export default SignupForm;
