import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../atoms/buttons/BaseButton";
import PasswordInput from "../atoms/inputs/PasswordInput";
import {
  axiosAuthPasswordChange,
  axiosAuthPasswordAssert,
} from "../../network/axios/axios.auth";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const ChangePasswordForm = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isAssert, setIsAssert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = () => {
    const same = password === newPassword;
    if (same) {
      axiosAuthPasswordChange({ newPassword })
        .then((response) => {
          if (response.status === 204) {
            alert("비밀번호가 변경되었습니다.");
            navigate("/");
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  const handleAssert = () => {
    if (password !== "") {
      axiosAuthPasswordAssert({ password })
        .then((response) => {
          setIsAssert(true);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

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
              setValue={setNewPassword}
            />
            {password !== newPassword && (
              <p style={{ fontSize: "0.7rem", color: "red" }}>
                {" "}
                비밀번호가 일치하지 않습니다.{" "}
              </p>
            )}
          </DivStyle>
          <BaseButton
            theme={"api"}
            color={"secondary"}
            variant={"contained"}
            value="변경하기"
            handleClick={handleChange}
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
          <BaseButton
            theme={"api"}
            color={"secondary"}
            variant={"contained"}
            value="비밀번호 확인"
            handleClick={handleAssert}
          />
        </>
      )}
    </FormStyle>
  );
};

export default ChangePasswordForm;
