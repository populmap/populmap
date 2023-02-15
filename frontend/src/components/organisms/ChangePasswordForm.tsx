import styled from "@emotion/styled";
import { useState } from "react";
import PasswordChangeButton from "../atoms/buttons/PasswordChangeButton";
import PasswordAssertButton from "../atoms/buttons/PasswordAssertButton";
import PasswordInput from "../atoms/inputs/PasswordInput";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const ChangePasswordForm = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [checkerPassword, setCheckerPassword] = useState<string>("");
  const [isAssert, setIsAssert] = useState<boolean>(false);

  return (
    <FormStyle>
      {isAssert && (
        <>
          <DivStyle>
            <h1>비밀번호 변경</h1>
            <PasswordInput
              title="새 비밀번호"
              placeholder="새 비밀번호"
              setValue={setPassword}
            />
            <PasswordInput
              title="새 비밀번호 확인"
              placeholder="새 비밀번호 확인"
              setValue={setCheckerPassword}
            />
            {password !== checkerPassword && (
              <p style={{ fontSize: "0.7rem", color: "red" }}>
                {" "}
                비밀번호가 일치하지 않습니다.{" "}
              </p>
            )}
          </DivStyle>
          <PasswordChangeButton
            value="변경하기"
            newPassword={password !== checkerPassword ? "" : password}
          />
        </>
      )}
      {!isAssert && (
        <>
          <DivStyle>
            <h1>비밀번호 변경</h1>
            <PasswordInput
              title="현재 비밀번호 입력"
              placeholder="비밀번호"
              setValue={setPassword}
            />
          </DivStyle>
          <PasswordAssertButton
            value="확인"
            password={password}
            setIsAssert={setIsAssert}
          />
        </>
      )}
    </FormStyle>
  );
};

export default ChangePasswordForm;
