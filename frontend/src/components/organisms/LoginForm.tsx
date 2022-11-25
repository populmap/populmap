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
const SubmitSection = styled.section``;

const LoginForm = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const handleSubmit = (): void => {
    console.log("clicked");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <InputSection>
        <InputInstance
          title="아이디"
          placeholder="아이디를 입력하세요"
          setValue={setUserId}
        />
        <InputInstance
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          setValue={setUserPassword}
        />
      </InputSection>
      <LoginSubmitButton
        userId={userId}
        userPassword={userPassword}
        value="로그인"
      />
    </Form>
  );
};

export default LoginForm;
