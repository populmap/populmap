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
const SubmitSection = styled.section``;

const SignupForm = (): JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  return (
    <Form>
      <h1>회원가입</h1>
      <InputSection>
        <InputInstance
          title="이메일"
          placeholder="이메일을 입력하세요"
          setValue={setUserEmail}
        />
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
      <SignupSubmitButton
        userEmail={userEmail}
        userId={userId}
        userPassword={userPassword}
        value="가입하기"
      />
    </Form>
  );
};

export default SignupForm;
