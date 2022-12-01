import styled from "@emotion/styled";
import { useState } from "react";
import PasswordApiButton from "../atoms/buttons/PasswordApiButton";
import { axiosAuthPasswordChange } from "../../network/axios/axios.auth";
import InputInstance from "../atoms/inputs/InputInstance";

const Form = styled.form`
  margin-top: 6rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.section`
  margin: 1rem 0;
`;

const ChangePasswordForm = (): JSX.Element => {
  const [userPassword, setUserPassword] = useState<string>("");
  const [userCheckerPassword, setUserCheckerPassword] = useState<string>("");

  return (
    <Form>
      <h1>비밀번호 변경</h1>
      <InputSection>
        <InputInstance
          title="새 비밀번호"
          placeholder="새 비밀번호"
          setValue={setUserPassword}
        />
        <InputInstance
          title="새 비밀번호 확인"
          placeholder="새 비밀번호 확인"
          setValue={setUserCheckerPassword}
        />
      </InputSection>
      {userPassword !== userCheckerPassword && (
        <p style={{ fontSize: "0.7rem", color: "red" }}>
          {" "}
          비밀번호가 일치하지 않습니다.{" "}
        </p>
      )}
      <PasswordApiButton
        value="변경하기"
        body={userPassword !== userCheckerPassword ? "" : userPassword}
        api={axiosAuthPasswordChange}
      />
    </Form>
  );
};

export default ChangePasswordForm;
