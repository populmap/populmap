import styled from "@emotion/styled";
import { useState } from "react";
import PasswordFindButton from "../atoms/buttons/PasswordFindButton";
import { axiosAuthPasswordFind } from "../../network/axios/axios.auth";
import InputInstance from "../atoms/inputs/InputInstance";

const Form = styled.form`
  margin-top: 6rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.section`
  margin: 1rem 0;
`;

const FindPasswordForm = (): JSX.Element => {
  const [id, setId] = useState<string>("");

  return (
    <Form>
      <h1>비밀번호 찾기</h1>
      <InputSection>
        <InputInstance
          title="비밀번호를 찾고자하는 아이디(이메일)를 입력해주세요."
          placeholder="아이디 또는 이메일"
          setValue={setId}
        />
      </InputSection>
      <PasswordFindButton value="다음" body={id === "" ? "" : id} />
    </Form>
  );
};

export default FindPasswordForm;
