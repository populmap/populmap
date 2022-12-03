import styled from "@emotion/styled";
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
  return (
    <Div>
      <a href="/auth/naver/login">
        <img src={NaverIcon} alt="naver" />
        naver
      </a>
      <a href="/auth/kakao/login">
        <img src={KakaoIcon} alt="kakao" />
        kakao
      </a>
      <a href="/auth/google/login">
        <img src={GoogleIcon} alt="google" />
      </a>
    </Div>
  );
};

export default OauthLoginNav;
