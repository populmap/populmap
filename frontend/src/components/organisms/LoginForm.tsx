import styled from "@emotion/styled";
import { useState } from "react";
import LoginButton from "../atoms/buttons/LoginButton";
import LoginInput from "../atoms/inputs/LoginInput";

const TitleSection = styled.section`
  margin-top: 3rem;
`;

const TitleSpan = styled.span``;

const InputSection = styled.section`
  margin-top: 1rem;
`;
const SubmitSection = styled.section`
  margin-top: 1rem;
`;

const LoginForm = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");
  const [userPasswd, setUserPasswd] = useState<string>("");

  return (
    <>
      <TitleSection>
        <TitleSpan>populmap</TitleSpan>
      </TitleSection>
      <InputSection>
        <LoginInput placeholder="아이디를 입력하세요" />
        <LoginInput placeholder="비밀번호를 입력하세요" />
      </InputSection>
      <SubmitSection>
        <LoginButton userId={userId} userPasswd={userPasswd} />
      </SubmitSection>
    </>
  );
};

export default LoginForm;
