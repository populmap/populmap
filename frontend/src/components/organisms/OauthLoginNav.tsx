import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NaverIcon from "../../../img/naver.svg";
import KakaoIcon from "../../../img/kakao.svg";
import GoogleIcon from "../../../img/google.svg";

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 15%;
  background-color: transparent;
  border: 0;
`;

const OauthLoginNav = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Div>
      <Button
        onClick={(): void => {
          navigate("/auth/naver/login");
        }}
      >
        <img src={NaverIcon} alt="naver" />
        naver
      </Button>
      <Button
        onClick={(): void => {
          navigate("/auth/kakao/login");
        }}
      >
        <img src={KakaoIcon} alt="kakao" />
        kakao
      </Button>
      <Button
        onClick={(): void => {
          navigate("/auth/google/login");
        }}
      >
        <img src={GoogleIcon} alt="google" />
        google
      </Button>
    </Div>
  );
};

export default OauthLoginNav;
