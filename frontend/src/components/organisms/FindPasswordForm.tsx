import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../atoms/buttons/BaseButton";
import { axiosAuthPasswordFind } from "../../network/axios/axios.auth";
import InputInstance from "../atoms/inputs/InputInstance";

const FormStyle = styled.form`
  text-align: center;
`;

const DivStyle = styled.div`
  padding-bottom: 0.5rem;
`;

const FindPasswordForm = (): JSX.Element => {
  const [body, setBody] = useState<string>("");
  const navigate = useNavigate();
  const handleClick = () => {
    if (body !== "") {
      axiosAuthPasswordFind({ id: body })
        .then((response) => {
          if (response.status === 204) {
            alert("아이디(이메일)로 임시 비밀번호가 발급되었습니다.");
            navigate("/login");
          }
        })
        .catch((error: any) => {
          console.error(error);
          alert("🚨 요청에 실패했습니다 🚨");
        });
    }
  };

  return (
    <FormStyle>
      <DivStyle>
        <h1>비밀번호 찾기</h1>
        <InputInstance
          title="비밀번호를 찾고자하는 아이디(이메일)를 입력해주세요."
          placeholder="아이디 또는 이메일"
          setValue={setBody}
        />
      </DivStyle>
      <BaseButton
        theme={"api"}
        color={"secondary"}
        variant={"contained"}
        value="비밀번호 찾기"
        handleClick={handleClick}
      />
    </FormStyle>
  );
};

export default FindPasswordForm;
