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
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkerPassword, setCheckerPassword] = useState<string>("");

  return (
    <Form>
      <h1>비밀번호 변경</h1>
      <InputSection>
        <InputInstance
          title="새 비밀번호"
          placeholder="새 비밀번호"
          setValue={setNewPassword}
        />
        <InputInstance
          title="새 비밀번호 확인"
          placeholder="새 비밀번호 확인"
          setValue={setCheckerPassword}
        />
      </InputSection>
      {newPassword !== checkerPassword && (
        <p style={{ fontSize: "0.7rem", color: "red" }}>
          {" "}
          비밀번호가 일치하지 않습니다.{" "}
        </p>
      )}
      <PasswordApiButton
        value="변경하기"
        newPassword={newPassword !== checkerPassword ? "" : newPassword}
        api={axiosAuthPasswordChange}
      />
    </Form>
  );
};

export default ChangePasswordForm;
