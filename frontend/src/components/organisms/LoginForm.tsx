import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../atoms/buttons/BaseButton";
import InputInstance from "../atoms/inputs/InputInstance";
import PasswordInput from "../atoms/inputs/PasswordInput";
import { axiosAuthLogin } from "../../network/axios/axios.auth";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const LoginForm = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = () => {
    axiosAuthLogin({ id, password })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else if (response.status === 202) navigate("/changepassword");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <FormStyle>
      <DivStyle>
        <h1>로그인</h1>
        <InputInstance
          title="아이디(이메일)"
          placeholder="아이디를 입력하세요"
          setValue={setId}
        />
        <PasswordInput
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          setValue={setPassword}
        />
      </DivStyle>
      <BaseButton value="로그인" handleClick={handleClick} />
    </FormStyle>
  );
};

export default LoginForm;
