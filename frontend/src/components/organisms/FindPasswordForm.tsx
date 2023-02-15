import styled from "@emotion/styled";
import { useState } from "react";
import PasswordFindButton from "../atoms/buttons/PasswordFindButton";
import { axiosAuthPasswordFind } from "../../network/axios/axios.auth";
import InputInstance from "../atoms/inputs/InputInstance";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const FindPasswordForm = (): JSX.Element => {
  const [id, setId] = useState<string>("");

  return (
    <FormStyle>
      <DivStyle>
        <h1>비밀번호 찾기</h1>
        <InputInstance
          title="비밀번호를 찾고자하는 아이디(이메일)를 입력해주세요."
          placeholder="아이디 또는 이메일"
          setValue={setId}
        />
      </DivStyle>
      <PasswordFindButton value="다음" body={id === "" ? "" : id} />
    </FormStyle>
  );
};

export default FindPasswordForm;
