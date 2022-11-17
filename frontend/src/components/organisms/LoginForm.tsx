import styled from "@emotion/styled";
import { useState } from "react";
import LoginButton from "../atoms/buttons/LoginButton";
import LoginInput from "../atoms/inputs/LoginInput";

const Form = styled.section`
  margin-top: 6rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.section`
  margin: 1rem 0;
`;
const SubmitSection = styled.section``;

const LoginForm = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");
  const [userPasswd, setUserPasswd] = useState<string>("");

  return (
    <Form>
      <h2>로그인</h2>
      <InputSection>
        <LoginInput title="아이디" placeholder="아이디를 입력하세요" />
        <LoginInput title="비밀번호" placeholder="비밀번호를 입력하세요" />
      </InputSection>
      <LoginButton userId={userId} userPasswd={userPasswd} />
    </Form>
  );
};

export default LoginForm;
